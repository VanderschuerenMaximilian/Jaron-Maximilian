import { CreateWerknemerInput } from './create-werknemer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWerknemerInput extends PartialType(CreateWerknemerInput) {
  @Field(() => Int)
  id: number;
}
