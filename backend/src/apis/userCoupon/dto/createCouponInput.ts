import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCouponInput {
  @Field(() => String)
  userId: string;

  @Field(() => Int)
  price: number;
}
