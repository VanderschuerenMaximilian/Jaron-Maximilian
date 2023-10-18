import { CreateAlertInput } from './create-alert.input';
import { ObjectId } from 'mongodb';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { Person } from 'src/persons/entities/person.entity';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@InputType()
export class UpdateAlertInput extends PartialType(CreateAlertInput) {

  @Field()
  state: string;

}
