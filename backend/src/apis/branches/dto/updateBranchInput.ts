import { InputType, PartialType } from '@nestjs/graphql';
import { CreateBranchInput } from './createBranchInput';
@InputType()
export class UpdateBranchInput extends PartialType(
  CreateBranchInput,
  InputType,
) {}
