import { Field, InputType } from '@nestjs/graphql';
import { Branch } from 'src/apis/branches/entity/branch.entity';

@InputType()
export class UpdateCouponInput {
  @Field(() => Boolean)
  isUsed: boolean;

  @Field(() => Date)
  useTime: Date;

  @Field(() => Branch)
  usePlace: Branch;
}
