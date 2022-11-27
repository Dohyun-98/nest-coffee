import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBranchInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  address: string;
  @Field(() => String)
  phone: string;
}
