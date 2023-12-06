import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateIngredientInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Float)
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  stock: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  stockReduction: number;

  @IsString()
  @IsNotEmpty()
  @Field()
  unit: string;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  minStock: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  maxStock: number;
}




