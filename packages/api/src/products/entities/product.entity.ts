import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity()
@ObjectType()
@Entity() // Add this decorator to mark this class as a TypeORM entity
export class Product {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  name: string

  @Column()
  @Field()
  description: string

  @Column()
  @Field()
  image: string

  @Column()
  @Field()
  price: string

  @Column()
  @Field(() => ID) // Assuming you have a Category entity with an ID
  category: string

  @Column('simple-array', { nullable: true })
  @Field(() => [String], { nullable: true })
  size?: string[]

  @Column('simple-array', { nullable: true })
  @Field(() => [ID], { nullable: true })
  sauce?: string[]

  @Column('simple-array', { nullable: true })
  @Field(() => [ID], { nullable: true })
  extra?: string[]

  @Column('simple-array', { nullable: true })
  @Field(() => [ID], { nullable: true })
  removable?: string[]

  @Column('simple-array', { nullable: true })
  @Field(() => [ID], { nullable: true })
  ingredients?: string[]

  @Column()
  @Field()
  shopType: string
}
