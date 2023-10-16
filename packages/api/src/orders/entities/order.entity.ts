import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@ObjectType()
class OrderSoldProduct {
  @Field()
  productId: string;

  @Field()
  size: string;

  @Field()
  sauce: string;

  @Field()
  amount: number;

  @Field(() => [String])
  removeables: string[];

  @Field(() => [String])
  extras: string[];
}

@ObjectType()
@Entity()
export class Order {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @Column()
  @Field()
  shopId: string;

  @Column()
  @Field()
  createdAt: Date;

  @Column()
  @Field(() => [OrderSoldProduct])
  soldProducts: OrderSoldProduct[];
}
