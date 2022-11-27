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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const productImages_service_1 = require("../productImages/productImages.service");
const createProductInput_1 = require("./dto/createProductInput");
const updateProductInput_1 = require("./dto/updateProductInput");
const product_entity_1 = require("./entity/product.entity");
const products_service_1 = require("./products.service");
let ProductsResolver = class ProductsResolver {
    constructor(productsService, productImagesService) {
        this.productsService = productsService;
        this.productImagesService = productImagesService;
    }
    fetchProducts(search) {
        return this.productsService.search({ search });
    }
    fetchProduct(id) {
        return this.productsService.findOne({ id });
    }
    async createProduct(createProductInput) {
        const { productImageUrls } = createProductInput, product = __rest(createProductInput, ["productImageUrls"]);
        const result = await this.productsService.create({
            createProductInput: product,
        });
        if (productImageUrls) {
            await this.productImagesService.create({
                urls: productImageUrls,
                productId: result.id,
            });
        }
        return result;
    }
    async updateProduct(id, updateProductInput) {
        const { productImageUrls } = updateProductInput, product = __rest(updateProductInput, ["productImageUrls"]);
        const result = await this.productsService.update({
            id,
            updateProductInput: product,
        });
        if (productImageUrls) {
            await this.productImagesService.update({
                urls: productImageUrls,
                productId: result.id,
            });
        }
        return result;
    }
};
__decorate([
    (0, graphql_1.Query)(() => [product_entity_1.Product]),
    __param(0, (0, graphql_1.Args)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "fetchProducts", null);
__decorate([
    (0, graphql_1.Query)(() => product_entity_1.Product),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "fetchProduct", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_entity_1.Product),
    __param(0, (0, graphql_1.Args)('createProductInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProductInput_1.CreateProductInput]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "createProduct", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_entity_1.Product),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('updateProductInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateProductInput_1.UpdateProductInput]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "updateProduct", null);
ProductsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        productImages_service_1.ProductImagesService])
], ProductsResolver);
exports.ProductsResolver = ProductsResolver;
//# sourceMappingURL=products.resolver.js.map