import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { PersonType as IPersonType } from 'src/interfaces/IPersonType';
import { JobType as IJobType } from 'src/interfaces/IJobType';

@Entity()
@ObjectType()
export class Person {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  uid: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  fullName: string;

  @Column()
  @Field()
  personalEmail: string;

  @Column()
  @Field({ nullable: true })
  workEmail: string;

  @Column()
  @Field()
  locale: string;

  @Column()
  @Field({ nullable: true })
  phone: string;

  @Column()
  @Field()
  personType: IPersonType;

  @Column()
  @Field({ nullable: true })
  jobType: IJobType;

  @Column({ type: 'timestamp' })
  @Field()
  createdAt: Date;

  @Column({ type: 'timestamp' })
  @Field()
  updatedAt: Date;
}
