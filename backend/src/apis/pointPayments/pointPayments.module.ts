import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IamportService } from '../iamport/iamport.service';
import { User } from '../users/entity/user.entity';
import { UsersService } from '../users/users.service';
import { PointPayment } from './entity/pointPayment.entity';
import { PointPaymentsResolver } from './pointPayments.resolver';
import { PointPaymentsService } from './pointPayments.service';

@Module({
  imports: [TypeOrmModule.forFeature([PointPayment, User])],
  providers: [
    PointPaymentsResolver,
    PointPaymentsService,
    UsersService,
    IamportService,
  ],
})
export class PointPaymentsModule {}
