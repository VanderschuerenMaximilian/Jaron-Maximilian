import { CreateStockInput } from './create-stock.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStockInput extends PartialType(CreateStockInput) {
  @Field()
  name?: string;
  
  @Field()
  difference?: number;
}
