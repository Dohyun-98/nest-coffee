import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSubcategory } from './entity/productSubcategory.entity';

@Injectable()
export class ProductsSubCategoryService {
  constructor(
    @InjectRepository(ProductSubcategory)
    private readonly productSubcategoryRepository: Repository<ProductSubcategory>,
  ) {}

  /** select Service Logic */
  async findAll() {
    return this.productSubcategoryRepository.find({
      relations: ['productMainCategory'],
    });
  }

  async findOne({ id }) {
    return this.productSubcategoryRepository.findOne({ where: { id } });
  }

  /** create Service Logic */
  async create({ createProductSubCategoryInput }) {
    const { productMainCategoryId, ...subcategory } =
      createProductSubCategoryInput;
    const isSubCategory = await this.productSubcategoryRepository.findOne({
      where: { name: subcategory.name },
    });

    if (isSubCategory) {
      throw new UnprocessableEntityException('exist SubCategory');
    }
    return await this.productSubcategoryRepository.save({
      name: subcategory.name,
      productMainCategory: { id: productMainCategoryId },
    });
  }

  /** update Service Logic */
  async update({ id, updateProductSubCategoryInput }) {
    const { productMainCategoryId, ...subcategory } =
      updateProductSubCategoryInput;
    const isSubCategory = this.productSubcategoryRepository.findOne({
      where: { id },
    });
    if (!isSubCategory) {
      throw new UnprocessableEntityException('not exist SubCategory');
    }

    return this.productSubcategoryRepository.save({
      ...isSubCategory,
      id,
      ...subcategory,
      productMainCategory: { id: productMainCategoryId },
    });
  }

  async delete({ id }) {
    const result = await this.productSubcategoryRepository.delete({ id });
    return result.affected ? true : false;
  }
}
