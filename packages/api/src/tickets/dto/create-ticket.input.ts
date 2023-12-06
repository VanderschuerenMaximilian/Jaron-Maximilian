import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsEmail, IsMongoId, IsNumber, IsPositive, IsString } from 'class-validator';

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
  @Field({ nullable: true })
  personId: string;

  @IsEmail()
  @Field({ nullable: true })
  confimationEmail: string;

  @IsDate()
  @Field()
  usableOn: Date;
}
