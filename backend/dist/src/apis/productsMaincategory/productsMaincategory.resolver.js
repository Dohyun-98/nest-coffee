"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsMainCategoryResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const productMaincategory_entity_1 = require("./entity/productMaincategory.entity");
const productsMaincategory_service_1 = require("./productsMaincategory.service");
let ProductsMainCategoryResolver = class ProductsMainCategoryResolver {
    constructor(productsMainCategoryService) {
        this.productsMainCategoryService = productsMainCategoryService;
    }
    fetchProductsMainCategories() {
        return this.productsMainCategoryService.findAll();
    }
    fetchProductMainCategory(name) {
        return this.productsMainCategoryService.findOne({ name });
    }
    createProductMainCategory(name) {
        return this.productsMainCategoryService.create({ name });
    }
    updateProductMainCategory(id, name) {
        this.productsMainCategoryService.update({ id, name });
    }
    deleteProductMainCategory(name) {
        this.productsMainCategoryService.delete({ name });
    }
};
__decorate([
    (0, graphql_1.Query)(() => [productMaincategory_entity_1.ProductMaincategory]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsMainCategoryResolver.prototype, "fetchProductsMainCategories", null);
__decorate([
    (0, graphql_1.Query)(() => productMaincategory_entity_1.ProductMaincategory),
    __param(0, (0, graphql_1.Args)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsMainCategoryResolver.prototype, "fetchProductMainCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => productMaincategory_entity_1.ProductMaincategory),
    __param(0, (0, graphql_1.Args)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsMainCategoryResolver.prototype, "createProductMainCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => productMaincategory_entity_1.ProductMaincategory),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProductsMainCategoryResolver.prototype, "updateProductMainCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsMainCategoryResolver.prototype, "deleteProductMainCategory", null);
ProductsMainCategoryResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [productsMaincategory_service_1.ProductsMainCategoryService])
], ProductsMainCategoryResolver);
exports.ProductsMainCategoryResolver = ProductsMainCategoryResolver;
//# sourceMappingURL=productsMaincategory.resolver.js.map