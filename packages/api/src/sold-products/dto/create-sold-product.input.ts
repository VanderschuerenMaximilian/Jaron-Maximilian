import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSoldProductInput {
  @Field({ nullable: true })
  productId: string;

  @Field()
  size: string;

  @Field()
  sauce: string;

  @Field()
  amount: number;

  @Field(() => [String])
  removeables: string[];

  @Field(() => [String])
  extras: string[];
}
