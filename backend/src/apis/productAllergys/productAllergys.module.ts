import { Module } from '@nestjs/common';
import { ProductAllergysService } from './productAllergys.service';
import { ProductAllergysResolver } from './productAllergys.resolver';

@Module({
  providers: [ProductAllergysService, ProductAllergysResolver],
})
export class ProductAllergysModule {}
