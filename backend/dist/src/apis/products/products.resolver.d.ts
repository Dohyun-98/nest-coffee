import { ProductImagesService } from '../productImages/productImages.service';
import { CreateProductInput } from './dto/createProductInput';
import { UpdateProductInput } from './dto/updateProductInput';
import { Product } from './entity/product.entity';
import { ProductsService } from './products.service';
export declare class ProductsResolver {
    private readonly productsService;
    private readonly productImagesService;
    constructor(productsService: ProductsService, productImagesService: ProductImagesService);
    fetchProducts(search: string): Promise<any>;
    fetchProduct(id: string): Promise<Product>;
    createProduct(createProductInput: CreateProductInput): Promise<any>;
    updateProduct(id: string, updateProductInput: UpdateProductInput): Promise<any>;
}
