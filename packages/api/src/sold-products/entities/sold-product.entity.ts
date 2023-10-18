import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class SoldProduct {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field({ nullable: true })
  productId: string;

  @Column()
  @Field()
  size: string;

  @Column()
  @Field()
  sauce: string;

  @Column()
  @Field()
  amount: number;

  @Column()
  @Field(() => [String])
  removeables: string[];

  @Column()
  @Field(() => [String])
  extras: string[];
}
