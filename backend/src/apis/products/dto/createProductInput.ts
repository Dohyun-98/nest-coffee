import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Min(0)
  @Field(() => Int)
  price?: number;

  @Min(0)
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  kcal?: number;

  @Min(0)
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  sugar?: number;

  @Min(0)
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  protein?: number;

  @Min(0)
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  saturated_fat?: number;

  @Min(0)
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  salt?: number;

  @Min(0)
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  caffeine?: number;

  @Field(() => String, { nullable: true })
  danger_massage?: string;

  @Field(() => String, { nullable: true })
  productSubCategory?: string;

  @Field(() => [String], { nullable: true })
  productAllergy: string[];

  @Field(() => [String], { nullable: true })
  productImageUrls?: string[];
}
