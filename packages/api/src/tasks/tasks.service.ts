import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
    const t = new Task()
    t.personId = createTaskInput.personId
    t.workblockId = createTaskInput.workblockId
    t.title = createTaskInput.title
    t.description = createTaskInput.description
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 1);
    t.createdAt = currentDate;
    t.shopName = createTaskInput.shopName
    t.stockItems = createTaskInput.stockItems
    await this.taskRepository.save(t)
    return t
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskInput: UpdateTaskInput) {
    return `This action updates a #${id} task`;
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
