import { ProductMaincategory } from './entity/productMaincategory.entity';
import { ProductsMainCategoryService } from './productsMaincategory.service';
export declare class ProductsMainCategoryResolver {
    private readonly productsMainCategoryService;
    constructor(productsMainCategoryService: ProductsMainCategoryService);
    fetchProductsMainCategories(): Promise<ProductMaincategory[]>;
    fetchProductMainCategory(name: string): Promise<ProductMaincategory>;
    createProductMainCategory(name: string): Promise<{
        name: any;
    } & ProductMaincategory>;
    updateProductMainCategory(id: string, name: string): void;
    deleteProductMainCategory(name: string): void;
}
