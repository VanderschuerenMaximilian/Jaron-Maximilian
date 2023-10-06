import { CreatePersonInput } from './create-person.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { PersonType as IPersonType } from 'src/interfaces/IPersonType';
import { JobType as IJobType } from 'src/interfaces/IJobType';

@InputType()
export class UpdatePersonInput extends PartialType(CreatePersonInput) {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  userId: string;

  @Field({ nullable: true })
  personType: IPersonType;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  fullName: string;

  @Field({ nullable: true })
  personalEmail: string;

  @Field({ nullable: true })
  workEmail: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  jobType: IJobType;

  @Field({ nullable: true })
  createdAt: Date;
}
