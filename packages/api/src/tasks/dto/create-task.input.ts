import { InputType, Int, Field } from '@nestjs/graphql';
import { IsArray, IsDate, IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
class StockItemInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  difference: number;
}

@InputType()
export class CreateTaskInput {
  @Field({ nullable: true })
  workblockId: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  description: string;

  @Field(() => [String], { nullable: true })
  persons: string[];

  @IsDate()
  @IsNotEmpty()
  @Field({ defaultValue: new Date() })
  createdAt: Date;

  @Field({ nullable: true })
  shopName: string;

  @Field(() => [StockItemInput], { nullable: true })
  stockItems: StockItemInput[];
}
