import { Person } from 'src/persons/entities/person.entity';
import { CreateTaskInput } from './create-task.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field(() => ID)
  id: string;

  @Field(() => [String])
  persons?: string[];
}
