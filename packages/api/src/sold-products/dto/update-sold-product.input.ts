import { CreateSoldProductInput } from './create-sold-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSoldProductInput extends PartialType(CreateSoldProductInput) {
  @Field(() => Int)
  id: number;
}
