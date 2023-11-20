import { IsBoolean, IsMongoId, IsString } from 'class-validator';
import { CreateTicketInput } from './create-ticket.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTicketInput extends PartialType(CreateTicketInput) {
  @IsMongoId()
  @Field(() => ID)
  id: string;
  
  @IsString()
  @Field()
  validationId: string;
}
