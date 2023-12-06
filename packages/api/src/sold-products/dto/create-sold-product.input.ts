import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

@InputType()
export class CreateSoldProductInput {
  @IsString()
  @Field({ nullable: true })
  productId: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  size: string;

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
