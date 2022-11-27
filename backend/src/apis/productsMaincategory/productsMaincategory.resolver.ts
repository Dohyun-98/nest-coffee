import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'common/auth/gql-auth.guard';
import { Roles } from 'common/auth/roles.decorator';
import { RolesGuard } from 'common/auth/roles.guard';
import { RoleType } from 'common/types/role';
import { ProductMaincategory } from './entity/productMaincategory.entity';
import { ProductsMainCategoryService } from './productsMaincategory.service';

@Resolver()
export class ProductsMainCategoryResolver {
  constructor(
    private readonly productsMainCategoryService: ProductsMainCategoryService,
  ) {}
  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [ProductMaincategory])
  fetchProductsMainCategories() {
    return this.productsMainCategoryService.findAll();
  }

  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => ProductMaincategory)
  fetchProductMainCategory(@Args('name') name: string) {
    return this.productsMainCategoryService.findOne({ name });
  }

  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ProductMaincategory)
  createProductMainCategory(@Args('name') name: string) {
    return this.productsMainCategoryService.create({ name });
  }

  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ProductMaincategory)
  updateProductMainCategory(
    @Args('id') id: string,
    @Args('name') name: string,
  ) {
    this.productsMainCategoryService.update({ id, name });
  }

  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteProductMainCategory(@Args('name') name: string) {
    this.productsMainCategoryService.delete({ name });
  }
}
