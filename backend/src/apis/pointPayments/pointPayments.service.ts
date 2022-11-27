import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../users/entity/user.entity';
import {
  PointPayment,
  POINT_PAYMENT_STATUS_ENUM,
} from './entity/pointPayment.entity';

@Injectable()
export class PointPaymentsService {
  constructor(
    @InjectRepository(User)
    @InjectRepository(PointPayment)
    private readonly pointPaymentRepository: Repository<PointPayment>,
    private readonly dataSource: DataSource,
  ) {}

  async create({ impUid, amount, user: _user, status }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction('SERIALIZABLE');
      const pointPayment = await this.pointPaymentRepository.create({
        impUid: impUid,
        amount,
        user: _user,
        status,
      });

      const result = await queryRunner.manager.save(pointPayment);
      const user = await queryRunner.manager.findOne(User, {
        lock: { mode: 'pessimistic_write' },
        where: { id: _user.id },
      });

      await queryRunner.manager.save(User, {
        ...user,
        point: user.point + amount,
      });
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async isPaidDuplicate({ impUid }) {
    const result = await this.pointPaymentRepository.findOne({
      where: { impUid, status: POINT_PAYMENT_STATUS_ENUM.PAYMENT },
    });
    if (result) {
      throw new ConflictException('already exist payment data');
    }
  }

  async isCancelDuplicate({ impUid }) {
    const result = await this.pointPaymentRepository.findOne({
      where: { impUid, status: POINT_PAYMENT_STATUS_ENUM.CANCEL },
    });
    if (result) {
      throw new ConflictException('already exist cancel payment data');
    }
  }

  async cancel({ impUid, amount, user: _user, status }) {
    return await this.create({ impUid, amount: -amount, user: _user, status });
  }
}
