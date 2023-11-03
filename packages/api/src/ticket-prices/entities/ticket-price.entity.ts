import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, ObjectIdColumn, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class TicketPrice {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  createdAt: Date;

  @Field()
  @Column()
  updatedAt: Date;
}
