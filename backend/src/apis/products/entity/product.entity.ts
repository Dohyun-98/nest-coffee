import { Field, ObjectType } from '@nestjs/graphql';
import { ProductAllergy } from 'src/apis/productAllergys/entity/productAllergy.entity';
import { ProductSubcategory } from 'src/apis/productsSubcategory/entity/productSubcategory.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// 필수 입력 : name, description, price

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('increment')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  @Field(() => String)
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  @Field(() => String, { nullable: true })
  description?: string;

  @Column({ type: 'int' })
  @Field(() => Number, { nullable: true })
  price?: number;

  @Column({ type: 'int', default: 0 })
  @Field(() => Number, { nullable: true })
  kcal?: number;

  @Column({ type: 'int', default: 0 })
  @Field(() => Number, { nullable: true })
  sugar?: number;

  @Column({ type: 'int', default: 0 })
  @Field(() => Number, { nullable: true })
  protein?: number;

  @Column({ type: 'int', default: 0 })
  @Field(() => Number, { nullable: true })
  saturated_fat?: number;

  @Column({ type: 'int', default: 0 })
  @Field(() => Number, { nullable: true })
  salt?: number;

  @Column({ type: 'int', nullable: true })
  @Field(() => Number, { nullable: true })
  caffeine?: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @Field(() => String, { nullable: true })
  danger_massage?: string;

  @ManyToOne(() => ProductSubcategory)
  @Field(() => ProductSubcategory, { nullable: true })
  productSubcategory: ProductSubcategory;

  @JoinTable()
  @ManyToMany(
    () => ProductAllergy,
    (productAllergys) => productAllergys.products,
  )
  @Field(() => [ProductAllergy], { nullable: true })
  productAllergys: ProductAllergy[];

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
