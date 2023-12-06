import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateStockInput } from './create-stock.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStockInput extends PartialType(CreateStockInput) {
  @IsString()
  @IsNotEmpty()
  @Field()
  name?: string;
  
  @IsNumber()
  @IsNotEmpty()
  @Field()
  difference?: number;
}
