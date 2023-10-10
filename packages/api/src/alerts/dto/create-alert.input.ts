import { InputType, Field } from '@nestjs/graphql';
import { AlertState as IAlertState } from '../../interfaces/IAlertState';

@InputType()
export class CreateAlertInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  state: IAlertState;

  @Field()
  createdBy: string;

  @Field(() => [String], {nullable: true})
  employees: string[];

  @Field({nullable: true})
  assignedEmployee: string;
}
