import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './createProductInput';

@InputType()
export class UpdateProductInput extends PartialType(
  CreateProductInput,
  InputType,
) {}
