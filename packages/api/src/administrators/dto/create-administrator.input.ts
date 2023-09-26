import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAdministratorInput {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;
}
