"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsMainCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const productMaincategory_entity_1 = require("./entity/productMaincategory.entity");
const productsMaincategory_resolver_1 = require("./productsMaincategory.resolver");
const productsMaincategory_service_1 = require("./productsMaincategory.service");
let ProductsMainCategoryModule = class ProductsMainCategoryModule {
};
ProductsMainCategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([productMaincategory_entity_1.ProductMaincategory])],
        providers: [productsMaincategory_resolver_1.ProductsMainCategoryResolver, productsMaincategory_service_1.ProductsMainCategoryService],
    })
], ProductsMainCategoryModule);
exports.ProductsMainCategoryModule = ProductsMainCategoryModule;
//# sourceMappingURL=productsMaincategory.module.js.map