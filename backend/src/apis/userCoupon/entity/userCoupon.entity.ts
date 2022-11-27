import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Branch } from 'src/apis/branches/entity/branch.entity';
import { User } from 'src/apis/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class UserCoupon {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @UpdateDateColumn()
  @Field(() => Date, { nullable: true })
  useTime: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean, { nullable: true })
  isUsed: boolean;

  @ManyToOne(() => Branch, { nullable: true })
  @Field(() => Branch, { nullable: true })
  usePlace: string;

  @Column({ type: 'int' })
  @Field(() => Int)
  price: number;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}
