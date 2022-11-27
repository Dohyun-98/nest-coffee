"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImagesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const productImage_entity_1 = require("./entity/productImage.entity");
const productImages_resolver_1 = require("./productImages.resolver");
const productImages_service_1 = require("./productImages.service");
let ProductImagesModule = class ProductImagesModule {
};
ProductImagesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([productImage_entity_1.ProductImage])],
        providers: [productImages_resolver_1.ProductImagesResolver, productImages_service_1.ProductImagesService],
    })
], ProductImagesModule);
exports.ProductImagesModule = ProductImagesModule;
//# sourceMappingURL=productImages.module.js.map