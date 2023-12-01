import { ObjectId } from 'typeorm';
import { CreateOrderInput } from './create-order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  id: number;
}
