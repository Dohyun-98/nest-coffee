import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class DetailOrderInput {
  @Field(() => String)
  productId: string;

  @Field(() => Int)
  quantity: number;
}

@InputType()
export class CreateOrderInput {
  @Field(() => [DetailOrderInput], { nullable: true })
  detail_order: DetailOrderInput[];
}
