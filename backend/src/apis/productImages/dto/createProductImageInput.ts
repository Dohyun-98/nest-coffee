import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductImageInput {
  @Field(() => [String])
  urls: string[];

  @Field(() => Boolean, { nullable: true })
  isMain: boolean;
}
