import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@ObjectType()
class OrderSoldProduct {
  @IsString()
  @IsNotEmpty()
  @Field()
  productName: string;

  @IsNumber()
  @IsNotEmpty()
  @Field()
  price: number;

  @IsString()
  @IsNotEmpty()
  @Field()
  size: string;

  @IsString()
  @Field({ nullable: true })
  sauce: string;

  @IsNumber()
  @IsNotEmpty()
  @Field()
  amount: number;

  @IsArray()
  @IsNotEmpty()
  @Field(() => [String])
  removeables: string[];

  @IsArray()
  @IsNotEmpty()
  @Field(() => [String])
  extras: string[];

  }

@ObjectType()
@Entity()
export class Order {
  @IsString()
  @IsNotEmpty()
  @Field()
  @ObjectIdColumn()
  id: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field()
  shopName: string;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  @Field()
  totalPrice: number;

  @IsString()
  @Column()
  @Field({ nullable: true })
  createdAt: Date;

  @IsArray()
  @IsNotEmpty()
  @Column()
  @Field(() => [OrderSoldProduct])
  soldProducts: OrderSoldProduct[];
}
