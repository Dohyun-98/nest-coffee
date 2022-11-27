import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entity/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductAllergy {
  @PrimaryGeneratedColumn('increment')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  name: string;

  @ManyToMany(() => Product, (products) => products.productAllergys)
  @Field(() => [Product])
  products: Product[];
}
