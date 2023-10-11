import { CreateAlertInput } from './create-alert.input';
import { ObjectId } from 'mongodb';
import { InputType, Field, Int, ID, PartialType } from '@nestjs/graphql';
import { Person } from 'src/persons/entities/person.entity';

@InputType()
export class UpdateAlertInput extends PartialType(CreateAlertInput) {
  @Field(() => ID)
  id: ObjectId;

  // @Field()
  // title: string;

  // @Field()
  // description: string;

  // @Field()
  // state: string;

  // @Field(() => [Person], { nullable: true })
  // persons: Person[];

  // @Field({ nullable: true })
  // personId: ObjectId;

  // @Field()
  // createdBy: ObjectId;
}
