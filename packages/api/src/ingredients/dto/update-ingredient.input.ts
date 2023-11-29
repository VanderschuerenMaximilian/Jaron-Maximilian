import { IsNotEmpty, IsString } from 'class-validator';
import { CreateIngredientInput } from './create-ingredient.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateIngredientInput extends PartialType(CreateIngredientInput) {
  @IsString()
  @IsNotEmpty()
  @Field(() => Int)
  id: number;
}
