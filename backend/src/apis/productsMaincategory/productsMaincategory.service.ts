import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductMaincategory } from './entity/productMaincategory.entity';

@Injectable()
export class ProductsMainCategoryService {
  constructor(
    @InjectRepository(ProductMaincategory)
    private readonly productMainCategoryRepository: Repository<ProductMaincategory>,
  ) {}

  /** select Service Logic */
  async findAll() {
    return this.productMainCategoryRepository.find();
  }

  async findOne({ name }) {
    return this.productMainCategoryRepository.findOne({ where: { name } });
  }

  /** create Service Logic  */
  async create({ name }) {
    const isMainCategory = await this.productMainCategoryRepository.findOne({
      where: { name },
    });
    if (isMainCategory) {
      throw new UnprocessableEntityException(
        'this main category already exists',
      );
    }
    return await this.productMainCategoryRepository.save({ name });
  }

  /** update Service Logic */
  async update({ id, name }) {
    const isMainCategory = await this.productMainCategoryRepository.findOne({
      where: { id },
    });
    if (isMainCategory) {
      throw new UnprocessableEntityException(
        'this main category already exists',
      );
    }
    return await this.productMainCategoryRepository.save({
      ...isMainCategory,
      name,
    });
  }

  /** delete Service Logic */
  async delete({ name }) {
    const isMainCategory = await this.productMainCategoryRepository.findOne({
      where: { name },
    });
    if (!isMainCategory) {
      throw new UnprocessableEntityException('this main category not exists');
    }
    const result = await this.productMainCategoryRepository.delete({
      name,
    });
    return result.affected ? true : false;
  }
}
