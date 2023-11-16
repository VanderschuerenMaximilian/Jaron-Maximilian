import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsMongoId, IsNumber, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateTicketInput {
  @IsPositive()
  @IsNumber()
  @Field()
  price: number;

  @IsString()
  @Field()
  name: string;

  @IsMongoId()
  @Field()
  personId: string;

  @IsDate()
  @Field()
  usableOn: Date;
}
