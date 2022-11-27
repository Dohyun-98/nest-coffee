import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'common/auth/gql-auth.guard';
import { CurrentUser } from 'common/auth/gql-user.parm';
import { IContext } from 'common/types/context';
import { IamportService } from '../iamport/iamport.service';
import {
  PointPayment,
  POINT_PAYMENT_STATUS_ENUM,
} from './entity/pointPayment.entity';
import { PointPaymentsService } from './pointPayments.service';

@Resolver()
export class PointPaymentsResolver {
  constructor(
    private readonly pointPaymentsService: PointPaymentsService,
    private readonly iamportService: IamportService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointPayment)
  async createPointPayment(
    @Args('impUid') impUid: string,
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @CurrentUser() user: IContext,
  ) {
    const access_token = await this.iamportService.getAccessToken();

    await this.iamportService.checkPaid({ impUid, access_token, amount });

    await this.pointPaymentsService.isPaidDuplicate({ impUid });

    return this.pointPaymentsService.create({
      impUid,
      amount,
      user,
      status: POINT_PAYMENT_STATUS_ENUM.PAYMENT,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointPayment)
  async cancelPointPayment(
    @Args('impUid') impUid: string,
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Args({ name: 'reason', type: () => String }) reason: string,
    @CurrentUser() user: IContext,
  ) {
    await this.pointPaymentsService.isCancelDuplicate({ impUid });

    const access_token = await this.iamportService.getAccessToken();
    await this.iamportService.checkCancel({
      impUid,
      access_token,
      amount,
    });

    await this.iamportService.cancel({
      impUid,
      access_token,
      reason,
    });

    const cancel = await this.pointPaymentsService.cancel({
      impUid,
      amount,
      user,
      status: POINT_PAYMENT_STATUS_ENUM.CANCEL,
    });
    return cancel;
  }
}
