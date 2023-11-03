import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { Column, ObjectIdColumn, Entity } from 'typeorm';
import { TicketPrize as ITicketPrize } from 'src/interfaces/ITicketPrize';

@Entity()
@ObjectType()
export class Ticket {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  // @IsEnum(ITicketPrize)
  // @Field()
  // @Column()
  // prize: number;

  @Field()
  @Column()
  isActive: boolean;

  @Field()
  @Column()
  expirationDate: Date;

  @Field()
  @Column()
  createdAt: Date;

  @Field()
  @Column()
  updatedAt: Date;
}
