import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class OrderSoldProductInput {
  @Field()
  productName: string;

  @Field()
  size: string;

  @Field()
  price: number;

  @Field()
  sauce: string;

  @Field()
  amount: number;

  @Field(() => [String])
  removeables: string[];

  @Field(() => [String])
  extras: string[];
}

@InputType()
export class CreateOrderInput {
  @Field()
  shopId: string;

  @Field(() => [OrderSoldProductInput])
  soldProducts: OrderSoldProductInput[];

  @Field()
  totalPrice: number;
}
