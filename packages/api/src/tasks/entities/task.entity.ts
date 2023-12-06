import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsNumber, IsString, IsNotEmpty, IsArray, IsBoolean, IsDate } from 'class-validator';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@ObjectType()
class stockItems {
  @IsString()
  @Field({ nullable: true })
  name: string;

  @IsNumber()
  @Field({ nullable: true})
  difference: number;
}

@Entity()
@ObjectType()
export class Task {
  @IsString()
  @IsNotEmpty()
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @IsArray()
  @Column()
  @Field(() => [String], { nullable: true })
  persons: string[];

  @IsString()
  @Column()
  @Field({ nullable: true })
  workblockId: string;

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

  @IsBoolean()
  @Column()
  @Field({ nullable: true })
  completed: boolean;

  @IsDate()
  @IsNotEmpty()
  @Column()
  @Field({ defaultValue: new Date()})
  createdAt: Date;

  @IsString()
  @Column()
  @Field({ nullable: true })
  shopName: string;

  @IsArray()
  @Column()
  @Field(() => [stockItems], { nullable: true })
  stockItems: stockItems[];
}
