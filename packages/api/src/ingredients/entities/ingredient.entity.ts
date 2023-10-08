import { ObjectType, Field, Float, Int } from '@nestjs/graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Ingredient {
  @ObjectIdColumn()
  @Field(() => String)
  id: string

  @Column()
  @Field(() => String, { nullable: true })
  userId: string

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
  @Field(() => String)
  unit: string

  @Column()
  @Field(() => Int)
  minStock: number

  @Column()
  @Field(() => Int)
  maxStock: number
}