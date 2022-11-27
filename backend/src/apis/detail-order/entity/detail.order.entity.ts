import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/apis/orders/entity/order.entity';
import { Product } from 'src/apis/products/entity/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class DetailOrder {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => Order)
  @Field(() => Order)
  order: Order;

  @ManyToOne(() => Product)
  @Field(() => Product)
  product: Product;

  @Column({ type: 'int' })
  @Field(() => Int)
  quantity: number;
}
