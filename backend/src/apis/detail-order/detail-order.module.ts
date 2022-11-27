import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailOrderResolver } from './detail-order.resolver';
import { DetailOrderService } from './detail-order.service';
import { DetailOrder } from './entity/detail.order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetailOrder])],
  providers: [DetailOrderResolver, DetailOrderService],
})
export class DetailOrderModule {}
