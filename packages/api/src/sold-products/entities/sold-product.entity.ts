import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class SoldProduct {
  @IsString()
  @IsNotEmpty()
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @IsString()
  @Column()
  @Field({ nullable: true })
  productId: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field()
  size: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field()
  sauce: string;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  @Field()
  amount: number;

  @IsArray()
  @IsNotEmpty()
  @Column()
  @Field(() => [String])
  removeables: string[];

  @IsArray()
  @IsNotEmpty()
  @Column()
  @Field(() => [String])
  extras: string[];
}
