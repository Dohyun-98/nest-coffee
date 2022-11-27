import { Repository } from 'typeorm';
import { ProductSubcategory } from './entity/productSubcategory.entity';
export declare class ProductsSubCategoryService {
    private readonly productSubcategoryRepository;
    constructor(productSubcategoryRepository: Repository<ProductSubcategory>);
    findAll(): Promise<ProductSubcategory[]>;
    findOne({ id }: {
        id: any;
    }): Promise<ProductSubcategory>;
    create({ createProductSubCategoryInput }: {
        createProductSubCategoryInput: any;
    }): Promise<{
        name: any;
        productMainCategory: {
            id: any;
        };
    } & ProductSubcategory>;
    update({ id, updateProductSubCategoryInput }: {
        id: any;
        updateProductSubCategoryInput: any;
    }): Promise<any>;
    delete({ id }: {
        id: any;
    }): Promise<boolean>;
}
