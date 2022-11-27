import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DetailOrderInput } from '../dto/createOrderInput';

@Entity('orders')
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @CreateDateColumn()
  @Field(() => Date)
  orderDate: Date;

  @Column({ type: 'int', nullable: true })
  @Field(() => Int)
  total_price: number;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
