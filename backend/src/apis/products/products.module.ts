import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAllergy } from '../productAllergys/entity/productAllergy.entity';
import { ProductImage } from '../productImages/entity/productImage.entity';
import { ProductImagesService } from '../productImages/productImages.service';
import { ProductSubcategory } from '../productsSubcategory/entity/productSubcategory.entity';
import { Product } from './entity/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductSubcategory,
      ProductImage,
      ProductAllergy,
    ]),
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
  ],
  providers: [ProductsService, ProductsResolver, ProductImagesService],
})
export class ProductsModule {}
