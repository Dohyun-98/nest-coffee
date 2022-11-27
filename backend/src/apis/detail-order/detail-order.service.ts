import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetailOrder } from './entity/detail.order.entity';

@Injectable()
export class DetailOrderService {
  constructor(
    @InjectRepository(DetailOrder)
    private readonly detailOrderRepository: Repository<DetailOrder>,
  ) {}

  async findAllByOrderId({ orderId }) {
    return await this.detailOrderRepository.find({ where: { order: orderId } });
  }
}
