import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'common/auth/gql-auth.guard';
import { Roles } from 'common/auth/roles.decorator';
import { RolesGuard } from 'common/auth/roles.guard';
import { RoleType } from 'common/types/role';
import { CreateProductSubcategoryInput } from './dto/createProductSubcategoryInput';
import { UpdateProductSubcategoryInput } from './dto/updateProductSubcategory';
import { ProductSubcategory } from './entity/productSubcategory.entity';
import { ProductsSubCategoryService } from './productsSubcategory.service';

@Resolver()
export class ProductsSubCategoryResolver {
  constructor(
    private readonly productSubcategoryService: ProductsSubCategoryService,
  ) {}

  @Query(() => [ProductSubcategory])
  fetchProductSubcategories() {
    return this.productSubcategoryService.findAll();
  }

  @Query(() => ProductSubcategory)
  fetchProductSubcategory(@Args('id') id: string) {
    return this.productSubcategoryService.findOne({ id });
  }

  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ProductSubcategory)
  createProductSubcategory(
    @Args('createProductSubCategoryInput')
    createProductSubCategoryInput: CreateProductSubcategoryInput,
  ) {
    return this.productSubcategoryService.create({
      createProductSubCategoryInput,
    });
  }

  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ProductSubcategory)
  updateProductSubcategory(
    @Args('id') id: string,
    @Args('updateProductSubCategoryInput')
    updateProductSubCategoryInput: UpdateProductSubcategoryInput,
  ) {
    return this.productSubcategoryService.update({
      id,
      updateProductSubCategoryInput,
    });
  }

  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteProductSubcategory(@Args('id') id: string) {
    return this.productSubcategoryService.delete({ id });
  }
}
