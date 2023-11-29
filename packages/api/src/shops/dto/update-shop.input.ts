import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateShopInput } from './create-shop.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateShopInput extends PartialType(CreateShopInput) {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  id: number;
}
