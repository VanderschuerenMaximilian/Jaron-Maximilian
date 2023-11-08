import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@ObjectType()
class OrderSoldProduct {
  @Field()
  productName: string;

  @Field()
  price: number;

  @Field()
  size: string;

  @Field({ nullable: true })
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
  @Field()
  @ObjectIdColumn()
  id: string;

  @Column()
  @Field()
  shopName: string;

  @Column()
  @Field()
  totalPrice: number;

  @Column()
  @Field({ nullable: true })
  createdAt: Date;

  @Column()
  @Field(() => [OrderSoldProduct])
  soldProducts: OrderSoldProduct[];
}
