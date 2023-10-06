import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAlertInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
