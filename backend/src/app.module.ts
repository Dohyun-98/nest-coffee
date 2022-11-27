import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointPaymentsModule } from './apis/pointPayments/pointPayments.module';
import { ProductsModule } from './apis/products/products.module';
import { ProductsMainCategoryModule } from './apis/productsMaincategory/productsMaincategory.module';
import { ProductsSubCategoryModule } from './apis/productsSubcategory/productsSubcategory.module';
import { UsersModule } from './apis/users/users.module';
import { IamportService } from './apis/iamport/iamport.service';
import { ProductImagesModule } from './apis/productImages/productImages.module';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { AuthModule } from './apis/auth/auth.module';
import { AppController } from './app.controller';
import { OrdersModule } from './apis/orders/orders.module';
import { DetailOrderModule } from './apis/detail-order/detail-order.module';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    ProductsModule,
    ProductsSubCategoryModule,
    ProductsMainCategoryModule,
    PointPaymentsModule,
    ProductImagesModule,
    OrdersModule,
    DetailOrderModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './common/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as any,
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logger: 'advanced-console',
      logging: true,
      retryAttempts: 30,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: process.env.REDIS_URL,
      isGlobal: true,
    }),
  ],
  providers: [IamportService],
  controllers: [AppController],
})
export class AppModule {}
