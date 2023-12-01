import { Person } from 'src/persons/entities/person.entity';
import { CreateTaskInput } from './create-task.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @IsString()
  @IsNotEmpty()
  @Field(() => ID)
  id: string;

  @Field(() => [String], { nullable: true })
  persons?: string[];

  @Field({ nullable: true })
  completed?: boolean;
}
