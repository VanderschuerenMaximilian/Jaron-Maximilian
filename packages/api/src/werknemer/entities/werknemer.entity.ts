import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Werknemer {
  @Field (() => ID)
  id: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;
}
