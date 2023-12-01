import { InputType, Field } from '@nestjs/graphql'
import { IsArray, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateShopInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string

  @IsString()
  @IsNotEmpty()
  @Field()
  image: string

  @IsString()
  @IsNotEmpty()
  @Field()
  description: string

  @IsArray()
  @IsNotEmpty()
  @Field(() => [String]) 
  products: string[]

  @IsString()
  @IsNotEmpty()
  @Field()
  zone: string

  @IsArray()
  @IsNotEmpty()
  @Field(() => [String]) 
  category: string[]

  @IsString()
  @IsNotEmpty()
  @Field()
  shopType: string
}
