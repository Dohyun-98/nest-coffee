import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum POINT_PAYMENT_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}
registerEnumType(POINT_PAYMENT_STATUS_ENUM, {
  name: 'POINT_PAYMENT_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class PointPayment {
  @PrimaryGeneratedColumn('increment')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 30 })
  @Field(() => String, { nullable: true })
  impUid: string;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int, { nullable: true })
  amount: number;

  @CreateDateColumn()
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Column({ type: 'enum', enum: POINT_PAYMENT_STATUS_ENUM })
  @Field(() => POINT_PAYMENT_STATUS_ENUM, { nullable: true })
  status: POINT_PAYMENT_STATUS_ENUM;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  user: User;
}
