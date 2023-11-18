import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateStockInput {
  @Field()
  name: string;

  @Field(() => String)
  facilityName: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  stock: number;

  @Field()
  pending: number;

  @Field(() => Int)
  stockReduction: number;

  @Field()
  unit: string;

  @Field(() => Int)
  minStock: number;

  @Field(() => Int)
  maxStock: number;
}
