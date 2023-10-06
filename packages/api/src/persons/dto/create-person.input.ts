import { InputType, Int, Field } from '@nestjs/graphql';
import { PersonType as IPersonType } from 'src/interfaces/IPersonType';
import { JobType as IJobType } from 'src/interfaces/IJobType';

@InputType()
export class CreatePersonInput {
  @Field({ nullable: true })
  userId: string;

  @Field()
  personType: IPersonType;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  fullName: string;

  @Field()
  personalEmail: string;

  @Field({ nullable: true })
  workEmail: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  jobType: IJobType;
}
