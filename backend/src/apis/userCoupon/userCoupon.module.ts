import { Module } from '@nestjs/common';
import { UserCouponService } from './userCoupon.service';

@Module({
  providers: [UserCouponService],
})
export class UserCouponModule {}
