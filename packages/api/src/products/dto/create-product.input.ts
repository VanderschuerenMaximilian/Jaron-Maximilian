import { InputType, Field } from '@nestjs/graphql'
import { Double } from 'typeorm'

@InputType()
export class CreateProductInput {
  @Field()
  name: string

  @Field()
  description: string

  @Field()
  image: string

  @Field()
  price: number

  @Field()
  sizeModifier: number

  @Field() // Assuming you have a Category entity with an ID
  category: string

  @Field(() => [String], { nullable: true })
  size?: string[]

  @Field(() => [String], { nullable: true })
  sauce?: string[]

  @Field(() => [String], { nullable: true })
  extra?: string[]

  @Field(() => [String], { nullable: true })
  removable?: string[]

  @Field(() => [String], { nullable: true })
  ingredients?: string[]

  @Field()
  shopType: string
}
