import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from './entity/productImage.entity';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {}
  // 업로드
  async upload({ files }) {
    const waitedFiles = await Promise.all(files);

    const storage = new Storage({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
    }).bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);

    const result = await Promise.all(
      waitedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          file
            .createReadStream()
            .pipe(storage.file(file.filename).createWriteStream())
            .on('finish', () => {
              resolve(process.env.GOOGLE_CLOUD_PATH + '/' + file.filename);
            })
            .on('error', () => reject());
        });
      }),
    );
    return result;
  }
  // DB 저장
  async create({ urls, productId }) {
    const result = await Promise.all(
      urls.map((url) => {
        return new Promise((resolve, reject) => {
          this.productImageRepository
            .save({
              url,
              product: { id: productId },
            })
            .then((result) => resolve(result.url))
            .catch((error) => {
              reject(error);
              throw new Error(error);
            });
        });
      }),
    );

    return result;
  }
  // DB 업데이트
  async update({ urls, productId }) {
    await this.productImageRepository.delete({
      product: { id: productId },
    });
    return this.create({ urls, productId });
  }

  // 업로드된 사진 삭제
  async deleteUpload({ urls }) {
    const storage = new Storage({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
    }).bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);

    // google cloud storage에 url이 존재할 경우 삭제
    const result = await Promise.all(
      urls.map((url) => {
        return new Promise((resolve, reject) => {
          const fileName = url.split(process.env.GOOGLE_CLOUD_PATH + '/')[1];
          storage
            .file(fileName)
            .delete()
            .then(() => {
              resolve(url);
            })
            .catch((error) => {
              reject(error);
              throw new Error(error);
            });
        });
      }),
    );

    return result;
  }

  async findWithProductId({ productId }) {
    return await this.productImageRepository.find({
      where: { product: { id: productId } },
    });
  }
}
