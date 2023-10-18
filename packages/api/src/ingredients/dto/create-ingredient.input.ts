import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateIngredientInput {
  @Field()
  name: string;

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




