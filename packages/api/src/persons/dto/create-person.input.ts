import { InputType, Field } from '@nestjs/graphql';
import { PersonType as IPersonType } from 'src/interfaces/IPersonType';
import { JobType as IJobType } from 'src/interfaces/IJobType';

@InputType()
export class CreatePersonInput {
  //niet nodig want fireguard heeft al uid in de token
  // @Field(() => String)
  // uid: string;

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
  locale: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  jobType: IJobType;
}
