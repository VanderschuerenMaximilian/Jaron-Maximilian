import { ObjectType, Field, ID } from '@nestjs/graphql';
import { AlertState as IAlertState } from 'src/interfaces/IAlertState';

@ObjectType()
export class Alert {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  state: IAlertState;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  //TODO: MAKE A REALATIONSHIP BETWEEN ALERT AND PERSON IF IT IS A EMPLOYEE AND ASSIGN TO AN ALERT
}
