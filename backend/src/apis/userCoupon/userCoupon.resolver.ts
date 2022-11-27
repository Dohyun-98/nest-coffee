import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'common/auth/gql-auth.guard';
import { CurrentUser } from 'common/auth/gql-user.parm';
import { UsersService } from '../users/users.service';
import { UserCoupon } from './entity/userCoupon.entity';
import { UserCouponService } from './userCoupon.service';

@Resolver()
export class UserCouponResolver {
  constructor(
    private readonly userCouponService: UserCouponService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [UserCoupon])
  findCoupon(@Args('id') id: string) {
    return this.userCouponService.findWithId({ id });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => UserCoupon)
  createUserCoupon(@CurrentUser() currentUser, @Args('price') price: number) {
    const user = this.usersService.findWithId({ id: currentUser.id });
    if (!user) {
      throw new NotFoundException('not found user');
    }
    return this.userCouponService.create({ userId: currentUser.id, price });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async useCoupon(
    @Args('couponId') couponId: string,
    @Args('branchId') branchId: string,
  ) {
    return await this.userCouponService.update({
      couponId,
      branchId,
      isUsed: true,
    });
  }
}
