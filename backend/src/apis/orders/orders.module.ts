import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailOrder } from '../detail-order/entity/detail.order.entity';
import { Product } from '../products/entity/product.entity';
import { User } from '../users/entity/user.entity';
import { Order } from './entity/order.entity';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, DetailOrder, Product, User])],
  providers: [OrdersResolver, OrdersService],
})
export class OrdersModule {}
