import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
class StockItemInput {
  @Field()
  name: string;

  @Field(() => Int)
  difference: number;
}

@InputType()
export class CreateTaskInput {
  @Field({ nullable: true })
  workblockId: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => [String], { nullable: true })
  persons: string[];

  @Field({ defaultValue: new Date() })
  createdAt: Date;

  @Field({ nullable: true })
  shopName: string;

  @Field(() => [StockItemInput], { nullable: true })
  stockItems: StockItemInput[];
}
