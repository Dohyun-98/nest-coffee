import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMaincategory } from './entity/productMaincategory.entity';
import { ProductsMainCategoryResolver } from './productsMaincategory.resolver';
import { ProductsMainCategoryService } from './productsMaincategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductMaincategory])],
  providers: [ProductsMainCategoryResolver, ProductsMainCategoryService],
})
export class ProductsMainCategoryModule {}
