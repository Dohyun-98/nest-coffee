import { FileUpload } from 'graphql-upload';
import { ProductImagesService } from './productImages.service';
export declare class ProductImagesResolver {
    private readonly productImagesService;
    constructor(productImagesService: ProductImagesService);
    uploadFiles(files: FileUpload[]): Promise<unknown[]>;
    updateUploadFiles(files: FileUpload, productId: string): Promise<unknown[]>;
}
