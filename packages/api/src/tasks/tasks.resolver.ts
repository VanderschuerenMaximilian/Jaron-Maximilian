import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField, Subscription } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { PersonsService } from 'src/persons/persons.service';
import { Person } from 'src/persons/entities/person.entity';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/authentication/services/guards/firebase.guard';
import { AllowedPersonTypes } from 'src/persons/decorators/personType.decorator';
import { PersonType as IPersonType } from 'src/interfaces/IPersonType';
//@ts-ignore
import { PubSub } from 'graphql-subscriptions';
import { PersonTypeGuard } from 'src/persons/guards/personType.guard';

const pubSub = new PubSub();

@Resolver(() => Task)
export class TasksResolver {
  constructor(
    private readonly tasksService: TasksService,
    private readonly personsService: PersonsService,
  ) {}

  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER)
  @Mutation(() => Task)
  async createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    const task = await this.tasksService.create(createTaskInput);
    pubSub.publish('taskAdded', { taskAdded: task });
    return task;
  }

  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER)
  @Query(() => [Task], { name: 'tasks' })
  findAll() {
    return this.tasksService.findAll();
  }

  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER)
  @Query(() => Task, { name: 'task' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.findOne(id);
  }

  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER)
  @Mutation(() => Task)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    const task = this.tasksService.update(updateTaskInput);
    pubSub.publish('tasksUpdated', { tasksUpdated: task });
    return task;
  }

  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER)
  @Mutation(() => Task)
  removeTask(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.remove(id);
  }

  @ResolveField(() => [Person], { name: 'persons' })
  async getPersonsForTask(@Parent() task: Task): Promise<Person[]> {
    const personIds = task.persons;
    if (personIds !== null && personIds !== undefined) {
      const persons = await Promise.all(
        personIds.map((personId) => this.personsService.findOneById(personId)),
      );
      return persons;
    } else {
      return [];
    }
  }

  @Subscription(() => Task, {
    name: 'tasksUpdated',
  })
  tasksUpdated() {
    return pubSub.asyncIterator('tasksUpdated');
  }
  @Subscription(() => Task, {
    name: 'taskAdded',
  })
  taskAdded() {
    return pubSub.asyncIterator('taskAdded');
  }
}
