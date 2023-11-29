import { IsNumber, IsNotEmpty } from 'class-validator';
import { CreateSoldProductInput } from './create-sold-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSoldProductInput extends PartialType(CreateSoldProductInput) {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  id: number;
}
