import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

@InputType()
export class OrderSoldProductInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  productName: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  size: string;

  @IsNumber()
  @IsNotEmpty()
  @Field()
  price: number;

  @IsString()
  @IsNotEmpty()
  @Field()
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

@InputType()
export class CreateOrderInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  shopName: string;

  @IsArray()
  @IsNotEmpty()
  @Field(() => [OrderSoldProductInput])
  soldProducts: OrderSoldProductInput[];

  @IsNumber()
  @IsNotEmpty()
  @Field()
  totalPrice: number;
}
