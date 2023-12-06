import { ObjectType, Field, ID } from '@nestjs/graphql'
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Column, Double, Entity, ObjectIdColumn } from 'typeorm'

@Entity()
@ObjectType()
@Entity() // Add this decorator to mark this class as a TypeORM entity
export class Product {
  @IsString()
  @IsNotEmpty()
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field()
  name: string

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field()
  description: string

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field()
  image: string

  @IsNumber()
  @IsNotEmpty()
  @Column()
  @Field()
  price: number

  @IsNumber()
  @IsNotEmpty()
  @Column()
  @Field()
  sizeModifier: number

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field(() => ID)
  category: string

  @IsArray()
  @Column('simple-array', { nullable: true })
  @Field(() => [String], { nullable: true })
  size?: string[]

  @IsArray()
  @Column('simple-array', { nullable: true })
  @Field(() => [ID], { nullable: true })
  sauce?: string[]

  @IsArray()
  @Column('simple-array', { nullable: true })
  @Field(() => [ID], { nullable: true })
  extra?: string[]

  @IsArray()
  @Column('simple-array', { nullable: true })
  @Field(() => [ID], { nullable: true })
  removable?: string[]

  @IsArray()
  @Column('simple-array', { nullable: true })
  @Field(() => [ID], { nullable: true })
  ingredients?: string[]

  @IsString()
  @Column()
  @Field()
  shopType: string
}
