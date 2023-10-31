import { InputType, Field } from '@nestjs/graphql';
import { AlertState } from 'src/interfaces/IAlertState';
import { Person } from 'src/persons/entities/person.entity';

@InputType()
export class CreateAlertInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  zoneId: string;
  
  @Field()
  createdBy: string;

}
