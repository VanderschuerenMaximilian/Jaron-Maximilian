import { InputType, Field } from '@nestjs/graphql';
import { AlertState as IAlertState } from '../../interfaces/IAlertState';
import { ObjectId } from 'mongodb';

@InputType()
export class CreateAlertInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  createdBy: string;

}
