import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsMongoId, IsNumber, IsPositive, IsString } from 'class-validator';
import { Column, ObjectIdColumn, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Ticket {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @IsMongoId()
  @Field()
  @Column()
  personId: string;

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

  @IsString()
  @Field()
  @Column()
  qrCode: string;
  
  @IsDate()
  @Field()
  @Column()
  expiresAt: Date;

  @IsDate()
  @Field()
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @IsDate()
  @Field()
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
