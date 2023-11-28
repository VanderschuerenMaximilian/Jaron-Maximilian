import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateTicketPriceInput {
  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  description: string;

  @IsPositive()
  @IsNumber()
  @Field()
  price: number;

  @IsNumber()
  @Field({ nullable: true })
  maxHeight: number;

  @IsNumber()
  @Field({ nullable: true })
  minHeight: number;
}
