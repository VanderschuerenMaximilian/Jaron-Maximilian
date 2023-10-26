import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Column, CreateDateColumn, Entity, ObjectIdColumn,  } from 'typeorm';
import { AlertState as IAlertState } from 'src/interfaces/IAlertState';
import { Person } from 'src/persons/entities/person.entity';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

@Entity()
@ObjectType()
export class Alert {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @IsNotEmpty()
  @Column()
  @Field()
  title: string;

  @IsNotEmpty()  
  @Column()
  @Field()
  description: string;

  @IsNotEmpty()
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
