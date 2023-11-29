import { ObjectType, Field, ID } from '@nestjs/graphql'
import { IsString, IsNotEmpty, IsArray } from 'class-validator'
import { Column, Entity,  ObjectIdColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Shop {
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
  image: string

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field()
  description: string

  @IsArray()
  @IsNotEmpty()
  @Column()
  @Field(() => [String])
  products: string[]

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field()
  zone: string

  @IsArray()
  @IsNotEmpty()
  @Column()
  @Field(() => [String])
  category: string[]

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field()
  shopType: string
}
