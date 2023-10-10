import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { AlertState as IAlertState } from 'src/interfaces/IAlertState';

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

  @Column()
  @Field()
  createdBy: string;

  @Column()
  @Field(()=> [String], {nullable: true})
  employees: string[];

  @Column()
  @Field({nullable: true})
  assignedEmployee: string;

  @Column()
  @Field()
  createdAt: Date;

  @Column()
  @Field()
  updatedAt: Date;
}
