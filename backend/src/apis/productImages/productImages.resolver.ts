import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ProductImagesService } from './productImages.service';

@Resolver()
export class ProductImagesResolver {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Mutation(() => [String])
  uploadFiles(
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[],
  ) {
    return this.productImagesService.upload({ files });
  }

  @Mutation(() => [String])
  async updateUploadFiles(
    @Args({ name: 'files', type: () => GraphQLUpload }) files: FileUpload,
    @Args('productId') productId: string,
  ) {
    const existImage = await this.productImagesService.findWithProductId({
      productId,
    });
    const urls = existImage.map((image) => image.url);
    await this.productImagesService.deleteUpload({ urls });
    return this.productImagesService.upload({ files });
  }
}
