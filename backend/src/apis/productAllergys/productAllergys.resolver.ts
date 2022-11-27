import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'common/auth/gql-auth.guard';
import { Roles } from 'common/auth/roles.decorator';
import { RolesGuard } from 'common/auth/roles.guard';
import { RoleType } from 'common/types/role';
import { ProductAllergy } from './entity/productAllergy.entity';
import { ProductAllergysService } from './productAllergys.service';

@Resolver()
export class ProductAllergysResolver {
  constructor(
    private readonly productAllergysService: ProductAllergysService,
  ) {}
  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ProductAllergy)
  createProductAllergy(@Args('name') name: string) {
    return this.productAllergysService.create({ name });
  }

  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ProductAllergy)
  updateProductAllergy(@Args('id') id: string, @Args('name') name: string) {
    return this.productAllergysService.update({ id, name });
  }

  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteProductAllergy(@Args('id') id: string) {
    return this.productAllergysService.delete({ id });
  }

  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [ProductAllergy])
  fetchAllProductAllergys() {
    return this.productAllergysService.fetchAll();
  }
}
