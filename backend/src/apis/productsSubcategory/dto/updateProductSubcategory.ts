import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductSubcategoryInput } from './createProductSubcategoryInput';

@InputType()
export class UpdateProductSubcategoryInput extends PartialType(
  CreateProductSubcategoryInput,
  InputType,
) {}
