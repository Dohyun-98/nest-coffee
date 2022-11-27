import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entity/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductImage {
  @PrimaryGeneratedColumn('increment')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  url: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean, { nullable: true })
  isMain?: boolean;

  @ManyToOne(() => Product)
  @Field(() => Product)
  product: Product;
}
