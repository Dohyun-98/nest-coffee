import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
export declare class ProductsService {
    private readonly productsRepository;
    private readonly cacheManager;
    private readonly elasticSearchService;
    constructor(productsRepository: Repository<Product>, cacheManager: Cache, elasticSearchService: ElasticsearchService);
    search({ search }: {
        search: any;
    }): Promise<any>;
    findOne({ id }: {
        id: any;
    }): Promise<Product>;
    create({ createProductInput }: {
        createProductInput: any;
    }): Promise<any>;
    update({ id, updateProductInput }: {
        id: any;
        updateProductInput: any;
    }): Promise<any>;
}
