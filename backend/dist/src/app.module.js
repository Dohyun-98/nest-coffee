"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const apollo_1 = require("@nestjs/apollo");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const pointPayments_module_1 = require("./apis/pointPayments/pointPayments.module");
const products_module_1 = require("./apis/products/products.module");
const productsMaincategory_module_1 = require("./apis/productsMaincategory/productsMaincategory.module");
const productsSubcategory_module_1 = require("./apis/productsSubcategory/productsSubcategory.module");
const users_module_1 = require("./apis/users/users.module");
const iamport_service_1 = require("./apis/iamport/iamport.service");
const productImages_module_1 = require("./apis/productImages/productImages.module");
const redisStore = require("cache-manager-redis-store");
const auth_module_1 = require("./apis/auth/auth.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            products_module_1.ProductsModule,
            productsSubcategory_module_1.ProductsSubCategoryModule,
            productsMaincategory_module_1.ProductsMainCategoryModule,
            pointPayments_module_1.PointPaymentsModule,
            productImages_module_1.ProductImagesModule,
            config_1.ConfigModule.forRoot(),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: './common/graphql/schema.gql',
                context: ({ req, res }) => ({ req, res }),
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: process.env.DATABASE_TYPE,
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
            common_1.CacheModule.register({
                store: redisStore,
                url: process.env.REDIS_URL,
                isGlobal: true,
            }),
        ],
        providers: [iamport_service_1.IamportService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map