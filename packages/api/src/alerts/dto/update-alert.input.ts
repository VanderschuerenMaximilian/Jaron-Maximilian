import { CreateAlertInput } from './create-alert.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAlertInput extends PartialType(CreateAlertInput) {

  @Field(() => ID)
  id: string;

  @Field()
  state: string;

  @Field({ nullable: true })
  assignedPersonId: string;
}
