import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateShopInput {
  @Field()
  name: string

  @Field()
  image: string

  @Field()
  description: string

  @Field(() => [String]) 
  dishes: string[]

  @Field()
  zone: string

  @Field(() => [String]) 
  category: string[]

  @Field()
  shopType: string
}
