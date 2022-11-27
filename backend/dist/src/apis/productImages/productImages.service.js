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
exports.ProductImagesService = void 0;
const storage_1 = require("@google-cloud/storage");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const productImage_entity_1 = require("./entity/productImage.entity");
let ProductImagesService = class ProductImagesService {
    constructor(productImageRepository) {
        this.productImageRepository = productImageRepository;
    }
    async upload({ files }) {
        console.log('files', files);
        const waitedFiles = await Promise.all(files);
        const storage = new storage_1.Storage({
            projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
            keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
        }).bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);
        const result = await Promise.all(waitedFiles.map((file) => {
            return new Promise((resolve, reject) => {
                file
                    .createReadStream()
                    .pipe(storage.file(file.filename).createWriteStream())
                    .on('finish', () => {
                    resolve(process.env.GOOGLE_CLOUD_PATH + '/' + file.filename);
                })
                    .on('error', () => reject());
            });
        }));
        return result;
    }
    async create({ urls, productId }) {
        const result = await Promise.all(urls.map((url) => {
            return new Promise((resolve, reject) => {
                this.productImageRepository
                    .save({
                    url,
                    product: { id: productId },
                })
                    .then((result) => resolve(result.url))
                    .catch((error) => {
                    reject(error);
                    throw new Error(error);
                });
            });
        }));
        return result;
    }
    async update({ urls, productId }) {
        await this.productImageRepository.delete({
            product: { id: productId },
        });
        return this.create({ urls, productId });
    }
    async deleteUpload({ urls }) {
        const storage = new storage_1.Storage({
            projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
            keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
        }).bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);
        const result = await Promise.all(urls.map((url) => {
            return new Promise((resolve, reject) => {
                const fileName = url.split(process.env.GOOGLE_CLOUD_PATH + '/')[1];
                storage
                    .file(fileName)
                    .delete()
                    .then(() => {
                    resolve(url);
                })
                    .catch((error) => {
                    reject(error);
                    throw new Error(error);
                });
            });
        }));
        return result;
    }
    async findWithProductId({ productId }) {
        return await this.productImageRepository.find({
            where: { product: { id: productId } },
        });
    }
};
ProductImagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(productImage_entity_1.ProductImage)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductImagesService);
exports.ProductImagesService = ProductImagesService;
//# sourceMappingURL=productImages.service.js.map