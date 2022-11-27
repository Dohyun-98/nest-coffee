"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const elasticsearch_1 = require("@nestjs/elasticsearch");
const typeorm_1 = require("@nestjs/typeorm");
const productImage_entity_1 = require("../productImages/entity/productImage.entity");
const productImages_service_1 = require("../productImages/productImages.service");
const productSubcategory_entity_1 = require("../productsSubcategory/entity/productSubcategory.entity");
const product_entity_1 = require("./entity/product.entity");
const products_resolver_1 = require("./products.resolver");
const products_service_1 = require("./products.service");
let ProductsModule = class ProductsModule {
};
ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product, productSubcategory_entity_1.ProductSubcategory, productImage_entity_1.ProductImage]),
            elasticsearch_1.ElasticsearchModule.register({
                node: 'http://elasticsearch:9200',
            }),
        ],
        providers: [products_service_1.ProductsService, products_resolver_1.ProductsResolver, productImages_service_1.ProductImagesService],
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;
//# sourceMappingURL=products.module.js.map