export declare class CreateProductInput {
    name: string;
    description: string;
    price?: number;
    kcal?: number;
    sugar?: number;
    protein?: number;
    saturated_fat?: number;
    salt?: number;
    caffeine?: number;
    danger_massage?: string;
    productSubCategoryId?: string;
    productAllergyId?: string[];
    productImageUrls?: string[];
}
