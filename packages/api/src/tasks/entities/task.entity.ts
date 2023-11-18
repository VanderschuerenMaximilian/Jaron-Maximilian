import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@ObjectType()
class StockItem {
  @Field()
  name: string;

  @Field()
  difference: number;
}

@Entity()
@ObjectType()
export class Task {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  personId: string;

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

  @Column(type => StockItem)
  @Field(() => [StockItem], { nullable: true })
  stockItems: StockItem[];
}
