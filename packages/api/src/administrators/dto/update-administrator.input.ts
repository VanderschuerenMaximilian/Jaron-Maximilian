import { CreateAdministratorInput } from './create-administrator.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAdministratorInput extends PartialType(CreateAdministratorInput) {
  @Field(() => Int)
  id: number;
}
