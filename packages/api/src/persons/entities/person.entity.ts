import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

enum JobType {
  CLEANER = 'CLEANER',
  SHOPKEEPER = 'SHOPKEEPER',
  ATTRACTION_OPERATOR = 'ATTRACTION_OPERATOR',
}

@Entity()
@ObjectType()
export class Person {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  createdAt: Date;

  @Column()
  @Field()
  updatedAt: Date;

  @Column()
  @Field()
  jobType: JobType;
}
