import { ObjectType, Field, Float, Int } from '@nestjs/graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'
import { IsDate, IsDefined, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, isString } from 'class-validator';


@Entity()
@ObjectType()
export class Ingredient {
  @IsString()
  @IsNotEmpty()
  @ObjectIdColumn()
  @Field(() => String)
  id: string

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