import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'common/auth/gql-auth.guard';
import { Roles } from 'common/auth/roles.decorator';
import { RolesGuard } from 'common/auth/roles.guard';
import { RoleType } from 'common/types/role';
import { BranchesService } from './branches.service';
import { CreateBranchInput } from './dto/createBranchInput';
import { UpdateBranchInput } from './dto/updateBranchInput';
import { Branch } from './entity/branch.entity';

@Resolver()
export class BranchesResolver {
  constructor(private readonly branchesService: BranchesService) {}

  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Branch])
  fetchBranches() {
    return this.branchesService.findAll();
  }

  /** find id of Branches */
  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => Branch)
  fetchBranch(@Args('id') id: string) {
    return this.branchesService.findOne({ id });
  }

  /** update Branch */
  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  updateBranch(
    @Args('id') id: string,
    @Args('updateBranchInput') updateBranchInput: UpdateBranchInput,
  ) {
    return this.branchesService.update({ id, updateBranchInput });
  }

  /** create Branch*/
  /** @Arg('CreateBranchInput') => name, address phone */

  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Branch)
  createBranch(
    @Args('createBranchInput') createBranchInput: CreateBranchInput,
  ) {
    return this.branchesService.create({ createBranchInput });
  }

  /** delete Branch  */
  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteBranch(@Args('id') id: string) {
    return this.branchesService.delete({ id });
  }
}
