import { CreateProductSubcategoryInput } from './dto/createProductSubcategoryInput';
import { UpdateProductSubcategoryInput } from './dto/updateProductSubcategory';
import { ProductSubcategory } from './entity/productSubcategory.entity';
import { ProductsSubCategoryService } from './productsSubcategory.service';
export declare class ProductsSubCategoryResolver {
    private readonly productSubcategoryService;
    constructor(productSubcategoryService: ProductsSubCategoryService);
    fetchProductSubcategories(): Promise<ProductSubcategory[]>;
    fetchProductSubcategory(id: string): Promise<ProductSubcategory>;
    createProductSubcategory(createProductSubCategoryInput: CreateProductSubcategoryInput): Promise<{
        name: any;
        productMainCategory: {
            id: any;
        };
    } & ProductSubcategory>;
    updateProductSubcategory(id: string, updateProductSubCategoryInput: UpdateProductSubcategoryInput): Promise<any>;
    deleteProductSubcategory(id: string): Promise<boolean>;
}
