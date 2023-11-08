import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm';
import { AlertState as IAlertState } from 'src/interfaces/IAlertState';
import { Person } from 'src/persons/entities/person.entity';
import { IsDate, IsDefined, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Entity()
@ObjectType()
export class Alert {
  @IsDefined()
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field()
  title: string;

  @IsString()
  @IsNotEmpty()  
  @Column()
  @Field()
  description: string;

  @IsEnum(IAlertState)
  @IsNotEmpty()
  @Column()
  @Field()
  state: IAlertState;

  @IsOptional()
  @IsNotEmpty()
  @Field(() => [Person], { nullable: 'itemsAndList' })
  @Column({ nullable: true })
  persons: Person[];

  @IsMongoId()
  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  @Field({ nullable: true })
  assignedPersonId: string;

  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  @Column()
  @Field()
  zoneId: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field()
  createdBy: string;

  @IsDate()
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  createdAt: Date;

  @IsDate()
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  updatedAt: Date;
}
