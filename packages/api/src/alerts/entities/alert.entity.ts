import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { AlertState as IAlertState } from 'src/interfaces/IAlertState';
import { Person } from 'src/persons/entities/person.entity';

@Entity()
@ObjectType()
export class Alert {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  state: IAlertState;

  @Field(() => [Person], { nullable: true })
  persons: Person[];

  @Column()
  personId: ObjectId;

  @Column()
  @Field()
  createdBy: string;

  @Column()
  @Field()
  createdAt: Date;

  @Column()
  @Field()
  updatedAt: Date;
}
