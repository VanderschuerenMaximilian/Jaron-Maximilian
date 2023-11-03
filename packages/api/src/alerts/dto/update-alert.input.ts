import { IsEnum, IsMongoId, IsString } from 'class-validator';
import { CreateAlertInput } from './create-alert.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { AlertState as IAlertState } from 'src/interfaces/IAlertState';

@InputType()
export class UpdateAlertInput extends PartialType(CreateAlertInput) {
  @IsMongoId()
  @Field(() => ID)
  id: string;

  @IsEnum(IAlertState)
  @Field()
  state: IAlertState;

  @IsMongoId()
  @Field({ nullable: true })
  assignedPersonId: string;
}
