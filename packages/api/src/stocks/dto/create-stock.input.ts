import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateStockInput {
  @Field()
  name: string;

  @Field(() => String)
  facilityId: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  stock: number;

  @Field(() => Int)
  stockReduction: number;

  @Field()
  unit: string;

  @Field(() => Int)
  minStock: number;

  @Field(() => Int)
  maxStock: number;
}
