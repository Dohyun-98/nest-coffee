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
exports.ProductImagesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_upload_1 = require("graphql-upload");
const productImages_service_1 = require("./productImages.service");
let ProductImagesResolver = class ProductImagesResolver {
    constructor(productImagesService) {
        this.productImagesService = productImagesService;
    }
    uploadFiles(files) {
        return this.productImagesService.upload({ files });
    }
    async updateUploadFiles(files, productId) {
        const existImage = await this.productImagesService.findWithProductId({
            productId,
        });
        const urls = existImage.map((image) => image.url);
        await this.productImagesService.deleteUpload({ urls });
        return this.productImagesService.upload({ files });
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => [String]),
    __param(0, (0, graphql_1.Args)({ name: 'files', type: () => [graphql_upload_1.GraphQLUpload] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ProductImagesResolver.prototype, "uploadFiles", null);
__decorate([
    (0, graphql_1.Mutation)(() => [String]),
    __param(0, (0, graphql_1.Args)({ name: 'files', type: () => graphql_upload_1.GraphQLUpload })),
    __param(1, (0, graphql_1.Args)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductImagesResolver.prototype, "updateUploadFiles", null);
ProductImagesResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [productImages_service_1.ProductImagesService])
], ProductImagesResolver);
exports.ProductImagesResolver = ProductImagesResolver;
//# sourceMappingURL=productImages.resolver.js.map