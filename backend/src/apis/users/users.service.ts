import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /** select Service Logic */
  async findAll() {
    const result = await this.usersRepository.find();
    if (result) {
      throw new UnprocessableEntityException('No users found');
    }
    return result;
  }

  async findOne({ email }) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findWithId({ id }) {
    return await this.usersRepository.find({ where: { id } });
  }

  async findWithDeleted({ email }) {
    return await this.usersRepository.findOne({
      withDeleted: true,
      where: { email },
    });
  }
  /** create Service Logic */
  async create({ createUserInput }) {
    const user = await this.usersRepository.findOne({
      where: { email: createUserInput.email },
    });
    if (user) {
      throw new UnprocessableEntityException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    return this.usersRepository.save({
      ...createUserInput,
      password: hashedPassword,
    });
  }

  /** update Service Logic */
  async update({ email, updateUserInput }) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new UnprocessableEntityException('User does not exist');
    }
    const result = await this.usersRepository.save({
      ...user,
      ...updateUserInput,
    });
    return result ? true : false;
  }
  /** delete Service Logic */
  async delete({ email }) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new UnprocessableEntityException('User does not exist');
    }
    const result = await this.usersRepository.softDelete({ email });
    return result.affected ? true : false;
  }

  /** restore Service Logic */
  async restore({ email }) {
    const user = await this.usersRepository.findOne({
      withDeleted: true,
      where: { email },
    });
    if (!user) {
      throw new UnprocessableEntityException('User does not exist');
    }
    const result = await this.usersRepository.restore({ email });
    return result.affected ? true : false;
  }
}
