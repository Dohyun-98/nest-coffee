import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'common/auth/gql-auth.guard';
import { Roles } from 'common/auth/roles.decorator';
import { RolesGuard } from 'common/auth/roles.guard';
import { RoleType } from 'common/types/role';
import { ProductImagesService } from '../productImages/productImages.service';
import { CreateProductInput } from './dto/createProductInput';
import { UpdateProductInput } from './dto/updateProductInput';
import { Product } from './entity/product.entity';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productImagesService: ProductImagesService,
  ) {}
  @Query(() => [Product])
  fetchProducts(@Args('search') search: string) {
    return this.productsService.search({ search });
  }

  @Query(() => Product)
  fetchProduct(@Args('id') id: string) {
    return this.productsService.findOne({ id });
  }
  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    const { productImageUrls, ...product } = createProductInput;
    const result = await this.productsService.create({
      createProductInput: product,
    });
    // 이미지 url을 이미지 테이블에 저장
    if (productImageUrls) {
      await this.productImagesService.create({
        urls: productImageUrls,
        productId: result.id,
      });
    }
    return result;
  }
  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    const { productImageUrls, ...product } = updateProductInput;
    const result = await this.productsService.update({
      id,
      updateProductInput: product,
    });
    // 이미지 url을 이미지 테이블에 저장
    if (productImageUrls) {
      await this.productImagesService.update({
        urls: productImageUrls,
        productId: result.id,
      });
    }
    return result;
  }

  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteProduct(@Args('id') id: string) {
    return await this.productsService.delete({ id });
  }
}
