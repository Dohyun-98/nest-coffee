import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from './entity/branch.entity';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
  ) {}

  async findAll() {
    return await this.branchRepository.find();
  }

  async findOne({ id }) {
    return await this.branchRepository.findOne({
      where: { id },
    });
  }

  async create({ createBranchInput }) {
    const branch = await this.branchRepository.findOne({
      where: { name: createBranchInput.name },
    });
    if (branch) {
      throw new UnprocessableEntityException('already exist branch');
    }
    return await this.branchRepository.save({ ...createBranchInput });
  }

  async update({ id, updateBranchInput }) {
    const branch = await this.branchRepository.findOne({
      where: { id },
    });
    if (!branch) {
      throw new UnprocessableEntityException('not found branch');
    }
    const result = await this.branchRepository.update(
      { id },
      { ...updateBranchInput },
    );
    return result.affected ? true : false;
  }
  async delete({ id }) {
    const branch = await this.branchRepository.findOne({ where: { id } });
    if (!branch) {
      throw new UnprocessableEntityException('not fount branch');
    }
    const result = await this.branchRepository.delete({ id });
    return result.affected ? true : false;
  }
}
