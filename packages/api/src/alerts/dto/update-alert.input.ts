import { CreateAlertInput } from './create-alert.input';
import { ObjectId } from 'mongodb';
import { InputType, Field, Int, ID, PartialType } from '@nestjs/graphql';
import { Person } from 'src/persons/entities/person.entity';
import { UpdatePersonInput } from 'src/persons/dto/update-person.input';

@InputType()
export class UpdateAlertInput extends PartialType(CreateAlertInput) {
  @Field(() => ID)
  id: ObjectId;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  state: string;

  @Field(() => [UpdatePersonInput], { nullable: true })
  persons: UpdatePersonInput[];

  @Field({ nullable: true })
  personId: ObjectId;

  @Field()
  createdBy: string;
}
