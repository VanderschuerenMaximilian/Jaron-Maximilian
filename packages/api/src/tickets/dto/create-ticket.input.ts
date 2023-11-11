import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateTicketInput {
  @IsPositive()
  @IsNumber()
  @Field()
  price: number;

  @IsString()
  @Field()
  name: string;
}
