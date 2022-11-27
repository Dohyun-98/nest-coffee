import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductSubcategoryInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  productMainCategoryId: string;
}
