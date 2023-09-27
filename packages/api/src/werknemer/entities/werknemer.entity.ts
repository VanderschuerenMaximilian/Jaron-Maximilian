import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Werknemer {

  @ObjectIdColumn()
  @Field (() => ID)
  id: string;
  
  @Column()
  @Field()
  firstname: string;
  
  @Column()
  @Field()
  lastname: string;
  
  @Column()
  @Field()
  email: string;
}
