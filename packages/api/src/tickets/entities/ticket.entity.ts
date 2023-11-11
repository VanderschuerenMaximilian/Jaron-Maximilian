import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsNumber, IsPositive, IsString } from 'class-validator';
import { Column, ObjectIdColumn, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Ticket {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @IsNumber()
  @IsPositive()
  @Field()
  @Column()
  price: number;

  @IsString()
  @Field()
  @Column()
  name: string;

  @IsBoolean()
  @Field()
  @Column()
  isActive: boolean;

  @IsDate()
  @Field()
  @Column()
  expirationDate: Date;

  @Field()
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
