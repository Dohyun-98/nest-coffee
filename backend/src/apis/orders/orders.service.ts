import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { DetailOrder } from '../detail-order/entity/detail.order.entity';
import { Product } from '../products/entity/product.entity';
import { User } from '../users/entity/user.entity';
import { Order } from './entity/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(DetailOrder)
    private readonly detailOrdersRepository: Repository<DetailOrder>,
    private readonly dataSource: DataSource,
  ) {}

  async create({ createOrderInput, CurrentUser }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction('SERIALIZABLE');
      const { detail_order, ...order } = createOrderInput;

      let totalPrice = 0;
      await Promise.all(
        detail_order.map(async (detail) => {
          return new Promise(async (resolve, reject) => {
            const product = await queryRunner.manager.findOne(Product, {
              lock: { mode: 'pessimistic_write' },
              where: { id: detail.productId },
            });
            totalPrice += product.price * detail.quantity;
            resolve(true);
          });
        }),
      );

      const user = await queryRunner.manager.findOne(User, {
        lock: { mode: 'pessimistic_write' },
        where: { id: CurrentUser.id },
      });

      if (user.point < totalPrice) {
        throw new UnprocessableEntityException('Not enough point');
      } else {
        user.point -= totalPrice;
        await queryRunner.manager.save(User, user);
      }

      const newOrder = this.ordersRepository.create({
        ...order,
        total_price: totalPrice,
      });
      await queryRunner.manager.save(newOrder);

      await Promise.all(
        detail_order.map(async (detail) => {
          return new Promise(async (resolve, reject) => {
            const newDetailOrder = this.detailOrdersRepository.create({
              ...detail,
              order: newOrder,
              product: detail.productId,
            });
            await queryRunner.manager.save(newDetailOrder);
            resolve(true);
          });
        }),
      );
      await queryRunner.commitTransaction();
      return newOrder;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll({ userId }) {
    return await this.ordersRepository.find({
      where: { user: userId },
    });
  }
}
