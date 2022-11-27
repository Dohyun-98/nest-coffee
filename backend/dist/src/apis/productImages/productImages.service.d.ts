import { Repository } from 'typeorm';
import { ProductImage } from './entity/productImage.entity';
export declare class ProductImagesService {
    private readonly productImageRepository;
    constructor(productImageRepository: Repository<ProductImage>);
    upload({ files }: {
        files: any;
    }): Promise<unknown[]>;
    create({ urls, productId }: {
        urls: any;
        productId: any;
    }): Promise<any[]>;
    update({ urls, productId }: {
        urls: any;
        productId: any;
    }): Promise<any[]>;
    deleteUpload({ urls }: {
        urls: any;
    }): Promise<any[]>;
    findWithProductId({ productId }: {
        productId: any;
    }): Promise<ProductImage[]>;
}
