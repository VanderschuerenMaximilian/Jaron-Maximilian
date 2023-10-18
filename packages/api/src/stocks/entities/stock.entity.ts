import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Stock {
  @ObjectIdColumn()
  @Field(() => String)
  id: string

  @Column()
  @Field(() => String)
  facilityId: string

  @Column()
  @Field(() => String)
  name: string

  @Column()
  @Field(() => Float)
  price: number

  @Column()
  @Field(() => Int)
  stock: number

  @Column()
  @Field(() => Int)
  stockReduction: number

  @Column()
  @Field(() => String)
  unit: string

  @Column()
  @Field(() => Int)
  minStock: number

  @Column()
  @Field(() => Int)
  maxStock: number
}
