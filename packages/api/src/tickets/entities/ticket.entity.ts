import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsMongoId, IsNumber, IsPositive, IsString } from 'class-validator';
import { TicketState } from 'src/interfaces/ITicketState';
import { Column, ObjectIdColumn, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Ticket {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @IsMongoId()
  @Field({ nullable: true })
  @Column()
  personId: string;

  @IsEmail()
  @Field({ nullable: true })
  @Column()
  confimationEmail: string;

  @IsNumber()
  @IsPositive()
  @Field()
  @Column()
  price: number;

  @IsString()
  @Field()
  @Column()
  name: string;

  @IsEnum(TicketState)
  @Field()
  @Column()
  isActive: TicketState;

  @IsString()
  @Field()
  @Column()
  validationId: string;

  @IsString()
  @Field()
  @Column()
  qrCode: string;
  
  @IsDate()
  @Field()
  @Column()
  usableOn: Date;

  @IsDate()
  @Field()
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @IsDate()
  @Field()
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
