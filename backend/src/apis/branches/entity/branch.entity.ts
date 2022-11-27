import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Branch {
  @PrimaryGeneratedColumn('increment')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String, { nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String, { nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String, { nullable: true })
  phone: string;
}
