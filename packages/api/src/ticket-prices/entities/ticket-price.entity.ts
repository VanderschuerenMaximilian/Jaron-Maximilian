import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsDate, IsMongoId, IsNumber, IsPositive, IsString } from 'class-validator';
import { Column, ObjectIdColumn, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class TicketPrice {
  @IsMongoId()
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @IsString()
  @Field()
  @Column()
  name: string;

  @IsString()
  @Field()
  @Column()
  description: string;

  @IsPositive()
  @IsNumber()
  @Field()
  @Column()
  price: number;

  @IsNumber()
  @Field({ nullable: true })
  @Column({ nullable: true })
  maxHeight: number;

  @IsNumber()
  @Field({ nullable: true })
  @Column({ nullable: true })
  minHeight: number;

  @IsDate()
  @Field()
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @IsDate()
  @Field()
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
