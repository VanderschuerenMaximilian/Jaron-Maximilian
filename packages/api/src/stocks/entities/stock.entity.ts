import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Stock {
  @IsString()
  @IsNotEmpty()
  @ObjectIdColumn()
  @Field(() => String)
  id: string

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field(() => String)
  facilityName: string

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field(() => String)
  name: string

  @IsNumber()
  @IsNotEmpty()
  @Column()
  @Field(() => Float)
  price: number

  @IsNumber()
  @IsNotEmpty()
  @Column()
  @Field(() => Int)
  stock: number

  @IsNumber()
  @IsNotEmpty()
  @Column()
  @Field()
  pending: number

  @IsNumber()
  @Column()
  @Field(() => Int)
  stockReduction: number

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field(() => String)
  unit: string

  @IsNumber()
  @IsNotEmpty()
  @Column()
  @Field(() => Int)
  minStock: number

  @IsNumber()
  @IsNotEmpty()
  @Column()
  @Field(() => Int)
  maxStock: number
}
