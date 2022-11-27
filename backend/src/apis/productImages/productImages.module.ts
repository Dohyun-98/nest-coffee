import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './entity/productImage.entity';
import { ProductImagesResolver } from './productImages.resolver';
import { ProductImagesService } from './productImages.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage])],
  providers: [ProductImagesResolver, ProductImagesService],
})
export class ProductImagesModule {}
