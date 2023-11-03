import { CreateTicketPriceInput } from './create-ticket-price.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTicketPriceInput extends PartialType(CreateTicketPriceInput) {
  @Field(() => Int)
  id: number;
}
