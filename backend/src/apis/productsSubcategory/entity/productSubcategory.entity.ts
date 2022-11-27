import { Field, ObjectType } from '@nestjs/graphql';
import { ProductMaincategory } from 'src/apis/productsMaincategory/entity/productMaincategory.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductSubcategory {
  @PrimaryGeneratedColumn('increment')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  name: string;

  @ManyToOne(
    () => ProductMaincategory,
    (productMainCategory) => productMainCategory.id,
  )
  @Field(() => ProductMaincategory)
  productMainCategory: ProductMaincategory;
}
