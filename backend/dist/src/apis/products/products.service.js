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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const elasticsearch_1 = require("@nestjs/elasticsearch");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entity/product.entity");
let ProductsService = class ProductsService {
    constructor(productsRepository, cacheManager, elasticSearchService) {
        this.productsRepository = productsRepository;
        this.cacheManager = cacheManager;
        this.elasticSearchService = elasticSearchService;
    }
    async search({ search }) {
        let product = await this.cacheManager.get(`product:${search}`);
        if (product) {
            return JSON.parse(product);
        }
        product = await this.elasticSearchService
            .search({
            index: 'products',
            query: {
                multi_match: {
                    fields: ['name', 'description'],
                    query: search,
                },
            },
            explain: true,
        })
            .catch(() => {
            throw new common_1.UnprocessableEntityException('this product is not exist');
        });
        if (!product || !product.hits.hits.length) {
            throw new common_1.UnprocessableEntityException('not found search keyword');
        }
        const productsArr = await product.hits.hits.map((product) => {
            return this.productsRepository.create({
                id: product._source._id,
                name: product._source.name,
                price: product._source.price,
                description: product._source.description,
                kcal: product._source.kcal,
                sugar: product._source.sugar,
                protein: product._source.protein,
                saturated_fat: product._source.saturated_fat,
                salt: product._source.salt,
                caffeine: product._source.caffeine,
                danger_massage: product._source.danger_massage,
                productSubcategory: product._source.productSubcategory,
            });
        });
        await this.cacheManager
            .set(`product:${search}`, JSON.stringify(productsArr), {
            ttl: 60 * 20,
        })
            .catch(() => {
            throw new common_1.InternalServerErrorException('redis set error');
        });
        return productsArr;
    }
    async findOne({ id }) {
        return this.productsRepository.findOne({ where: { id } });
    }
    async create({ createProductInput }) {
        const isProduct = await this.productsRepository.findOne({
            where: { name: createProductInput.name },
        });
        if (isProduct) {
            throw new common_1.UnprocessableEntityException('this product is already exist');
        }
        return await this.productsRepository.save(Object.assign({}, createProductInput));
    }
    async update({ id, updateProductInput }) {
        const isProduct = await this.productsRepository.findOne({
            where: { id },
        });
        if (!isProduct) {
            throw new common_1.UnprocessableEntityException('this product is not exist');
        }
        return await this.productsRepository.save(Object.assign(Object.assign(Object.assign({}, isProduct), { id: isProduct.id }), updateProductInput));
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object, elasticsearch_1.ElasticsearchService])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map