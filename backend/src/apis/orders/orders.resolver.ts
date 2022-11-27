import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'common/auth/gql-auth.guard';
import { CurrentUser } from 'common/auth/gql-user.parm';
import { CreateOrderInput } from './dto/createOrderInput';
import { Order } from './entity/order.entity';
import { OrdersService } from './orders.service';

@Resolver()
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Order)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @CurrentUser() CurrentUser,
  ) {
    return this.ordersService.create({ createOrderInput, CurrentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Order])
  async fetchOrders(@CurrentUser() currentUser) {
    return await this.ordersService.findAll({ userId: currentUser.id });
  }
}
