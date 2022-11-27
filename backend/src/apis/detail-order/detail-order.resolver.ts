import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'common/auth/gql-auth.guard';
import { DetailOrderService } from './detail-order.service';
import { DetailOrder } from './entity/detail.order.entity';

@Resolver()
export class DetailOrderResolver {
  constructor(private readonly detailOrderService: DetailOrderService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [DetailOrder])
  async fetchDetailOrderById(@Args('orderId') orderId: string) {
    return await this.detailOrderService.findAllByOrderId({ orderId });
  }
}
