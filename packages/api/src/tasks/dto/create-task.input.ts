import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
class StockItemInput {
  @Field()
  name: string;

  @Field(() => Int)
  stock: number;
}

@InputType()
export class CreateTaskInput {
  @Field()
  personId: string;

  @Field()
  workblockId: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ defaultValue: new Date()})
  createdAt: Date;

  @Field({ nullable: true })
  shopName: string;

  @Field(() => [StockItemInput], { nullable: true })
  stockItems: StockItemInput[];
}
