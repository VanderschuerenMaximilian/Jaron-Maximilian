import { InputType, Field } from '@nestjs/graphql'
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Double } from 'typeorm'

@InputType()
export class CreateProductInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string

  @IsString()
  @IsNotEmpty()
  @Field()
  description: string

  @IsString()
  @IsNotEmpty()
  @Field()
  image: string

  @IsNumber()
  @IsNotEmpty()
  @Field()
  price: number

  @IsNumber()
  @IsNotEmpty()
  @Field()
  sizeModifier: number

  @IsString()
  @IsNotEmpty()
  @Field() // Assuming you have a Category entity with an ID
  category: string

  @IsArray()
  @Field(() => [String], { nullable: true })
  size?: string[]

  @IsArray()
  @Field(() => [String], { nullable: true })
  sauce?: string[]

  @IsArray()
  @Field(() => [String], { nullable: true })
  extra?: string[]

  @IsArray()
  @Field(() => [String], { nullable: true })
  removable?: string[]

  @IsArray()
  @Field(() => [String], { nullable: true })
  ingredients?: string[]

  @IsString()
  @Field()
  shopType: string
}
