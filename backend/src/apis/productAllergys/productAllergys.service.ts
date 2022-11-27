import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAllergy } from './entity/productAllergy.entity';

@Injectable()
export class ProductAllergysService {
  constructor(
    @InjectRepository(ProductAllergy)
    private readonly productAllergyRepository: Repository<ProductAllergy>,
  ) {}

  async create({ name }) {
    return await this.productAllergyRepository.save({
      name,
    });
  }

  async update({ id, name }) {
    return await this.productAllergyRepository.update(
      { id },
      {
        name,
      },
    );
  }

  async delete({ id }) {
    const result = await this.productAllergyRepository.delete({ id });
    return result.affected ? true : false;
  }

  fetchAll() {
    return this.productAllergyRepository.find();
  }
}
