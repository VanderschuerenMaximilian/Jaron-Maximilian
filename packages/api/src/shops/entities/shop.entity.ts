import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, Entity,  ObjectIdColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Shop {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  name: string

  @Column()
  @Field()
  image: string

  @Column()
  @Field()
  description: string

  @Column()
  @Field(() => [String])
  dishes: string[]

  @Column()
  @Field()
  zone: string

  @Column()
  @Field(() => [String])
  category: string[]

  @Column()
  @Field()
  shopType: string
}
