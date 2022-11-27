import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSubcategory } from './entity/productSubcategory.entity';
import { ProductsSubCategoryResolver } from './productsSubcategory.resolver';
import { ProductsSubCategoryService } from './productsSubcategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSubcategory])],
  providers: [ProductsSubCategoryResolver, ProductsSubCategoryService],
})
export class ProductsSubCategoryModule {}
