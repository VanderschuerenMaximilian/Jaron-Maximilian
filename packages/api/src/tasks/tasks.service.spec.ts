import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';
import { createTaskInputStub, updateTaskInputStub, taskStub } from './stubs/task.stub';

describe('TasksService', () => {
  let tasksService: TasksService;
  let taskRepository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    taskRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks: Task[] = [taskStub()];
      jest.spyOn(taskRepository, 'find').mockResolvedValueOnce(tasks);

      const result = await tasksService.findAll();

      expect(result).toEqual(tasks);
    });

    it('should throw an error on failure', async () => {
      const errorMock = new Error('Find failed');
      jest.spyOn(taskRepository, 'find').mockRejectedValueOnce(errorMock);

      await expect(tasksService.findAll()).rejects.toThrowError('Find failed');
    });
  });

  describe('create', () => {
    it('should create and return a task', async () => {
      const createTaskInput: CreateTaskInput = createTaskInputStub();
      const mockedTask: Task = taskStub();
      const saveSpy = jest.spyOn(taskRepository, 'save').mockResolvedValueOnce(mockedTask);

      const result = await tasksService.create(createTaskInput);

      expect(result).toBeInstanceOf(Task);
      expect(saveSpy).toHaveBeenCalledWith(expect.any(Task));
    });

    it('should throw an error on failure', async () => {
      const errorMock = new Error('Save failed');
      jest.spyOn(taskRepository, 'save').mockRejectedValueOnce(errorMock);

      const createTaskInput: CreateTaskInput = createTaskInputStub();

      await expect(tasksService.create(createTaskInput)).rejects.toThrowError('Save failed');
    });
  });

  describe('update', () => {
    it('should update a task and return the updated task', async () => {
      const updateTaskInput: UpdateTaskInput = updateTaskInputStub();
      const existingTask: Task = taskStub();
      existingTask.id = updateTaskInput.id;
    
      jest.spyOn(tasksService, 'findOneById').mockResolvedValueOnce(existingTask);
      const saveSpy = jest.spyOn(taskRepository, 'save').mockResolvedValueOnce(existingTask);
    
      const result = await tasksService.update(updateTaskInput);
    
      expect(result).toEqual(existingTask);
      expect(result.id).toBe(updateTaskInput.id);
      expect(result.persons).toEqual(updateTaskInput.persons);
    
      expect(tasksService.findOneById).toHaveBeenCalledWith(updateTaskInput.id);
      expect(saveSpy).toHaveBeenCalledWith(existingTask);
    });
  
    it('should throw an error if no update parameters are provided', async () => {
      const updateTaskInput: UpdateTaskInput = {
        id: '1',
      };
  
      jest.spyOn(tasksService, 'findOneById').mockResolvedValueOnce(new Task());
  
      await expect(tasksService.update(updateTaskInput)).rejects.toThrowError('No update parameters provided');
    });
  });
});
