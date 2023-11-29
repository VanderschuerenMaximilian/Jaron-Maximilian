import { InputType, Int, Field } from '@nestjs/graphql';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsString()
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

  @IsArray()
  @Field(() => [String], { nullable: true })
  persons: string[];

  @IsDate()
  @IsNotEmpty()
  @Field({ defaultValue: new Date() })
  createdAt: Date;

  @IsString()
  @Field({ nullable: true })
  shopName: string;

  @IsArray()
  @Field(() => [StockItemInput], { nullable: true })
  stockItems: StockItemInput[];
}
