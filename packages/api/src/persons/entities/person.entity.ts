import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm';
import { PersonType as IPersonType } from 'src/interfaces/IPersonType';
import { JobType as IJobType } from 'src/interfaces/IJobType';
import { IsBoolean } from 'class-validator';

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
  @Field({ nullable: true })
  profilePicture: string;

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
  @Field(() => IPersonType)
  personType: IPersonType;

  @Column()
  @Field(() => IJobType, { nullable: true })
  jobType: IJobType;

  @Field(() => [String], { nullable: 'itemsAndList' })
  @Column()
  assignedAlerts: string[];

  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  @Column()
  navContainerState: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date;
}
