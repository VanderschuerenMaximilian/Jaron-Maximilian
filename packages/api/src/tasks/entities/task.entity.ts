import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@ObjectType()
class stockItems {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true})
  difference: number;
}

@Entity()
@ObjectType()
export class Task {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => [String], { nullable: true })
  persons: string[];

  @Column()
  @Field({ nullable: true })
  workblockId: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field({ defaultValue: new Date()})
  createdAt: Date;

  @Column()
  @Field({ nullable: true })
  shopName: string;

  @Column()
  @Field(() => [stockItems], { nullable: true })
  stockItems: stockItems[];
}
