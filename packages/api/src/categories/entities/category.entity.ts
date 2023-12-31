import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Category {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  name: string

  @Column()
  @Field()
  image: string
}
