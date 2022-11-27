import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entity/user.entity';
import { UserCoupon } from './entity/userCoupon.entity';

@Injectable()
export class UserCouponService {
  constructor(
    @InjectRepository(UserCoupon)
    private readonly userCouponRepository: Repository<UserCoupon>,
  ) {}

  async findWithId({ id }) {
    const result = await this.userCouponRepository.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('not found Coupon');
    }
    return result;
  }

  async create({ userId, price }) {
    return await this.userCouponRepository.save({ user: userId, price });
  }

  async update({ couponId, branchId, isUsed }) {
    const coupon = await this.userCouponRepository.findOne({
      where: {
        id: couponId,
      },
    });
    if (!coupon) {
      throw new NotFoundException('not found coupon');
    }
    return await this.userCouponRepository.update(
      { id: couponId },
      { usePlace: branchId, isUsed },
    );
  }
}
