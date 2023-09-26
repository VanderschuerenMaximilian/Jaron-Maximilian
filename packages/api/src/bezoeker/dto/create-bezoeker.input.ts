import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBezoekerInput {
  @Field()
  name: string

  @Field()
  fullname: string

  @Field()
  email: string

}
