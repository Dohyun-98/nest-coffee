import { Repository } from 'typeorm';
import { ProductMaincategory } from './entity/productMaincategory.entity';
export declare class ProductsMainCategoryService {
    private readonly productMainCategoryRepository;
    constructor(productMainCategoryRepository: Repository<ProductMaincategory>);
    findAll(): Promise<ProductMaincategory[]>;
    findOne({ name }: {
        name: any;
    }): Promise<ProductMaincategory>;
    create({ name }: {
        name: any;
    }): Promise<{
        name: any;
    } & ProductMaincategory>;
    update({ id, name }: {
        id: any;
        name: any;
    }): Promise<{
        name: any;
        id: string;
    } & ProductMaincategory>;
    delete({ name }: {
        name: any;
    }): Promise<boolean>;
}
