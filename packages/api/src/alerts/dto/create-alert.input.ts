import { InputType, Field } from '@nestjs/graphql';
import { MinLength, MaxLength, IsString, IsMongoId } from 'class-validator';

@InputType()
export class CreateAlertInput {
  @MinLength(10)
  @MaxLength(30)
  @IsString()
  @Field()
  title: string;

  @MinLength(15)
  @MaxLength(150)
  @IsString() 
  @Field()
  description: string;

  @IsMongoId()
  @Field()
  zoneId: string;
  
  @IsMongoId()
  @Field()
  createdBy: string;

}
