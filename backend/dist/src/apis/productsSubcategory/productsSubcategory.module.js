"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsSubCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const productSubcategory_entity_1 = require("./entity/productSubcategory.entity");
const productsSubcategory_resolver_1 = require("./productsSubcategory.resolver");
const productsSubcategory_service_1 = require("./productsSubcategory.service");
let ProductsSubCategoryModule = class ProductsSubCategoryModule {
};
ProductsSubCategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([productSubcategory_entity_1.ProductSubcategory])],
        providers: [productsSubcategory_resolver_1.ProductsSubCategoryResolver, productsSubcategory_service_1.ProductsSubCategoryService],
    })
], ProductsSubCategoryModule);
exports.ProductsSubCategoryModule = ProductsSubCategoryModule;
//# sourceMappingURL=productsSubcategory.module.js.map