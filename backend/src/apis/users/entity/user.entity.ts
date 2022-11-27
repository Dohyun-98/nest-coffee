import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//계정 포인트 정보, 인증 정보,  관리자 여부, 스탬프 는 가입시, default값으로만 설정
//관리자 계정은 해당 정보 수정 가능하게 설계

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: number;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  @Field(() => String)
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int)
  point: number;

  @Column({ type: 'boolean', default: false })
  isAuth: boolean;

  @Column({ type: 'varchar', default: 'user' })
  role: string;

  @Column({ type: 'int', default: 0 })
  stamp: number;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
