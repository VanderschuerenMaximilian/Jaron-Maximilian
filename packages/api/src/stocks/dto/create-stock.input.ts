import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateStockInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  facilityName: string;

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
  @Field()
  pending: number;

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
