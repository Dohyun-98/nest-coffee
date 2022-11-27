import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { ProductAllergy } from '../productAllergys/entity/productAllergy.entity';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(ProductAllergy)
    private readonly productAllergysRepository: Repository<ProductAllergy>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly elasticSearchService: ElasticsearchService,
  ) {}

  async search({ search }) {
    // Redis에서 검색어를 가져와서 검색어가 포함된 상품을 가져온다.
    let product: any = await this.cacheManager.get(`product:${search}`);

    // Redis에서 검색어를 가져오지 못했을 경우, ElasticSearch에서 검색어를 조회한다.
    // console.log('redis :' + product);
    if (product) {
      // console.log('find in redis');
      return JSON.parse(product);
    }
    product = await this.elasticSearchService
      .search({
        index: 'products',
        query: {
          multi_match: {
            fields: ['name', 'description'],
            query: search,
          },
        },
        explain: true,
      })
      .catch(() => {
        throw new UnprocessableEntityException('this product is not exist');
      });

    // console.log('elsatic :' + JSON.stringify(product));
    // ElasticSearch에서 검색어를 조회하지 못했을 경우, throw new Error('검색어를 찾을 수 없습니다.');
    if (!product || !product.hits.hits.length) {
      throw new UnprocessableEntityException('not found search keyword');
    }

    const productsArr = await product.hits.hits.map((product: any) => {
      return this.productsRepository.create({
        id: product._source._id,
        name: product._source.name,
        price: product._source.price,
        description: product._source.description,
        kcal: product._source.kcal,
        sugar: product._source.sugar,
        protein: product._source.protein,
        saturated_fat: product._source.saturated_fat,
        salt: product._source.salt,
        caffeine: product._source.caffeine,
        danger_massage: product._source.danger_massage,
        productSubcategory: product._source.productSubcategory,
      });
    });
    // ElasticSearch에서 검색어를 조회했을 경우, Redis에 검색어를 저장한다.
    await this.cacheManager
      .set(`product:${search}`, JSON.stringify(productsArr), {
        ttl: 60 * 20,
      })
      .catch(() => {
        // console.log('error :' + err);
        throw new InternalServerErrorException('redis set error');
      });
    // 검색에 성공한 결과를 응답
    return productsArr;
  }

  async findOne({ id }) {
    return this.productsRepository.findOne({ where: { id } });
  }
  async create({ createProductInput }) {
    const { productAllergy, productSubCategory, ...product } =
      createProductInput;
    const isProduct = await this.productsRepository.findOne({
      where: { name: createProductInput.name },
    });
    if (isProduct) {
      throw new UnprocessableEntityException('this product is already exist');
    }

    // 알러지배열에서 알러지가 있으면 id 반환 없으면 추가 후 id 반환

    const allergyArr = await Promise.all(
      productAllergy.map(async (el) => {
        return await new Promise(async (resolve, rejects) => {
          const exist = await this.productAllergysRepository.findOne({
            where: { name: el },
          });
          if (exist) {
            resolve(exist);
          } else {
            const result: ProductAllergy =
              await this.productAllergysRepository.save({
                name: el,
              });
            resolve(result);
          }
        });
      }),
    );

    return await this.productsRepository.save({
      ...product,
      productSubcategory: { id: productSubCategory },
      productAllergys: allergyArr,
      // 실제 알러지 저장
    });
  }

  async update({ id, updateProductInput }) {
    const { productAllergy, productSubCategory, ...product } =
      updateProductInput;
    const isProduct = await this.productsRepository.findOne({
      where: { id },
    });
    if (!isProduct) {
      throw new UnprocessableEntityException('this product is not exist');
    }

    const allergyArr = await Promise.all(
      productAllergy.map(async (el) => {
        return await new Promise(async (resolve, rejects) => {
          const exist = await this.productAllergysRepository.findOne({
            where: { name: el },
          });
          if (exist) {
            resolve(exist);
          } else {
            const result: ProductAllergy =
              await this.productAllergysRepository.save({
                name: el,
              });
            resolve(result);
          }
        });
      }),
    );

    return await this.productsRepository.save({
      ...isProduct,
      productSubcategory: { id: productSubCategory },
      productAllergys: allergyArr,
      ...product,
      // 실제 알러지 저장
    });
  }

  async delete({ id }) {
    return (await (
      await this.productsRepository.delete({ id })
    ).affected)
      ? true
      : false;
  }
}
