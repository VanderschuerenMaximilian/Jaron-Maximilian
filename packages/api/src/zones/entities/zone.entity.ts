import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Zone {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @IsNotEmpty()
  @Column()
  @Field()
  name: string;

  @IsNotEmpty()
  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  createdAt: Date;

  @Column()
  @Field()
  updatedAt: Date;

  // exspand to use mapbox coordinates
}
