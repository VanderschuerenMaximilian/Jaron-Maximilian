import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType({ description: 'bezoeker' })
export class Bezoeker {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  fullname: string

  @Field()
  email: string

  @Field()
  createdAt: Date

}
