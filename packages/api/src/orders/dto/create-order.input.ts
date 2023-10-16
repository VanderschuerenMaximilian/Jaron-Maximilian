import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class OrderSoldProductInput {
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

@InputType()
export class CreateOrderInput {
  @Field()
  shopId: string;

  @Field()
  createdAt: Date;

  @Field(() => [OrderSoldProductInput])
  soldProducts: OrderSoldProductInput[];
}
