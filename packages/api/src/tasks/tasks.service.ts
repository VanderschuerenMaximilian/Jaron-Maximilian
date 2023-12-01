import { Get, Injectable, Param } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  findAll() {
    return this.taskRepository.find()
  }
  
  async create(createTaskInput: CreateTaskInput): Promise<Task> {
    try {
      const t = new Task()
      t.workblockId = createTaskInput.workblockId
      t.title = createTaskInput.title
      t.description = createTaskInput.description
      const currentDate = new Date();
      console.log(currentDate)
      currentDate.setHours(currentDate.getHours() + 1);
      t.createdAt = currentDate;
      t.shopName = createTaskInput.shopName
      t.stockItems = createTaskInput.stockItems
      await this.taskRepository.save(t)
      return t
    }
    catch (e) {
      throw new Error(e)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  @Get(':id')
  findOneById(@Param('id') id: string): Promise<Task> {

      if (!ObjectId.isValid(id)) throw new Error('Invalid ObjectId')

      // @ts-ignore
      return this.taskRepository.findOne({ _id: new ObjectId(id) })
  }

  async update(updateTaskInput: UpdateTaskInput) {
    const task = await this.findOneById(updateTaskInput.id)
    if (task === undefined) {
      throw new Error('Task not found')
    }
    if (updateTaskInput.persons !== undefined) {
      task.persons = updateTaskInput.persons
    }
    else {
      if (updateTaskInput.completed !== undefined) {
        task.completed = updateTaskInput.completed
      }
      else {
        throw new Error('No update parameters provided')
      }
    }
    

    return await this.taskRepository.save(task);
    }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }

  // seeding logic
  async saveAllTasks(tasks: Task[]): Promise<Task[]> {
    return this.taskRepository.save(tasks)
  }
  async truncate(): Promise<void> {
    await this.taskRepository.clear()
  }
}
