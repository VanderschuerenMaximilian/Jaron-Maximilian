import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Column, CreateDateColumn, Entity, ObjectIdColumn,  } from 'typeorm';
import { AlertState as IAlertState } from 'src/interfaces/IAlertState';
import { Person } from 'src/persons/entities/person.entity';

@Entity()
@ObjectType()
export class Alert {
  @Field(() => ID)
  @ObjectIdColumn()
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

  @Field(() => [Person], { nullable: 'itemsAndList' })
  @Column({ nullable: true })
  persons: Person[];

  @Column()
  @Field({ nullable: true })
  assignedPersonId: string;

  @Column()
  @Field()
  createdBy: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date;
}
