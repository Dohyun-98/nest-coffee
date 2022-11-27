import { ProductAllergy } from 'src/apis/productAllergys/entity/productAllergy.entity';
import { ProductSubcategory } from 'src/apis/productsSubcategory/entity/productSubcategory.entity';
export declare class Product {
    id: string;
    name: string;
    description?: string;
    price?: number;
    kcal?: number;
    sugar?: number;
    protein?: number;
    saturated_fat?: number;
    salt?: number;
    caffeine?: number;
    danger_massage?: string;
    productSubcategory: ProductSubcategory;
    productAllergys: ProductAllergy[];
    updatedAt: Date;
    deletedAt: Date;
}
