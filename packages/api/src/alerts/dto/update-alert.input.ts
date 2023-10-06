import { CreateAlertInput } from './create-alert.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAlertInput extends PartialType(CreateAlertInput) {
  @Field(() => Int)
  id: number;
}
