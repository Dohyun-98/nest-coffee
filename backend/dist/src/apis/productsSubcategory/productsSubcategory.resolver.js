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
exports.ProductsSubCategoryResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const createProductSubcategoryInput_1 = require("./dto/createProductSubcategoryInput");
const updateProductSubcategory_1 = require("./dto/updateProductSubcategory");
const productSubcategory_entity_1 = require("./entity/productSubcategory.entity");
const productsSubcategory_service_1 = require("./productsSubcategory.service");
let ProductsSubCategoryResolver = class ProductsSubCategoryResolver {
    constructor(productSubcategoryService) {
        this.productSubcategoryService = productSubcategoryService;
    }
    fetchProductSubcategories() {
        return this.productSubcategoryService.findAll();
    }
    fetchProductSubcategory(id) {
        return this.productSubcategoryService.findOne({ id });
    }
    createProductSubcategory(createProductSubCategoryInput) {
        return this.productSubcategoryService.create({
            createProductSubCategoryInput,
        });
    }
    updateProductSubcategory(id, updateProductSubCategoryInput) {
        return this.productSubcategoryService.update({
            id,
            updateProductSubCategoryInput,
        });
    }
    deleteProductSubcategory(id) {
        return this.productSubcategoryService.delete({ id });
    }
};
__decorate([
    (0, graphql_1.Query)(() => [productSubcategory_entity_1.ProductSubcategory]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsSubCategoryResolver.prototype, "fetchProductSubcategories", null);
__decorate([
    (0, graphql_1.Query)(() => productSubcategory_entity_1.ProductSubcategory),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsSubCategoryResolver.prototype, "fetchProductSubcategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => productSubcategory_entity_1.ProductSubcategory),
    __param(0, (0, graphql_1.Args)('createProductSubCategoryInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProductSubcategoryInput_1.CreateProductSubcategoryInput]),
    __metadata("design:returntype", void 0)
], ProductsSubCategoryResolver.prototype, "createProductSubcategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => productSubcategory_entity_1.ProductSubcategory),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('updateProductSubCategoryInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateProductSubcategory_1.UpdateProductSubcategoryInput]),
    __metadata("design:returntype", void 0)
], ProductsSubCategoryResolver.prototype, "updateProductSubcategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsSubCategoryResolver.prototype, "deleteProductSubcategory", null);
ProductsSubCategoryResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [productsSubcategory_service_1.ProductsSubCategoryService])
], ProductsSubCategoryResolver);
exports.ProductsSubCategoryResolver = ProductsSubCategoryResolver;
//# sourceMappingURL=productsSubcategory.resolver.js.map