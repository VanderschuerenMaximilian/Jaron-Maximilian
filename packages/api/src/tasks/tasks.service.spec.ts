import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
      const tasks: Task[] = []; // Create some tasks for testing
      jest.spyOn(taskRepository, 'find').mockResolvedValueOnce(tasks);

      const result = await tasksService.findAll();

      expect(result).toEqual(tasks);
    });
  });

  describe('create', () => {
    it('should create and return a task', async () => {
      const createTaskInput: CreateTaskInput = {
        title: 'Example Task',
        description: 'Example description',
        persons: null,
        shopName: 'Boomerang Snack',
        stockItems: [
          { name: 'Item1', difference: 10 },
          { name: 'Item2', difference: 5 },
        ],
        workblockId: '',
        createdAt: undefined
      };

      const mockedTask: Task = new Task();
      const saveSpy = jest.spyOn(taskRepository, 'save').mockResolvedValueOnce(mockedTask);
      const result = await tasksService.create(createTaskInput);

      expect(result).toBeInstanceOf(Task);
      expect(saveSpy).toHaveBeenCalledWith(expect.any(Task));
    });

    it('should throw an error on failure', async () => {
      const errorMock = new Error('Save failed');
      jest.spyOn(taskRepository, 'save').mockRejectedValueOnce(errorMock);

      const createTaskInput: CreateTaskInput = {
        title: 'Example Task',
        description: 'Example description',
        persons: null,
        shopName: 'Boomerang Snack',
        stockItems: [
          { name: 'Item1', difference: 10 },
          { name: 'Item2', difference: 5 },
        ],
        workblockId: '',
        createdAt: undefined
      };

      await expect(tasksService.create(createTaskInput)).rejects.toThrowError('Save failed');
    });
  });

  describe('update', () => {
    it('should update a task and return the updated task', async () => {
      // Mocking data
      const taskId = '1';
      const updateTaskInput: UpdateTaskInput = {
        id: taskId,
        persons: ['John Doe', 'Jane Doe'],
      };
  
      const existingTask: Task = new Task();
      existingTask.id = taskId;
  
      jest.spyOn(tasksService, 'findOneById').mockResolvedValueOnce(existingTask);
  
      const saveSpy = jest.spyOn(taskRepository, 'save').mockResolvedValueOnce(existingTask);
  
      const result = await tasksService.update(updateTaskInput);
  
      // Assertions
      expect(result).toBeInstanceOf(Task);
      expect(result.id).toBe(taskId); // Ensure the ID is correct
      expect(result.persons).toEqual(updateTaskInput.persons); // Ensure persons are updated
  
      // Verify that findOneById and save were called with the correct parameters
      expect(tasksService.findOneById).toHaveBeenCalledWith(updateTaskInput.id);
      expect(saveSpy).toHaveBeenCalledWith(existingTask);
    });
  
    it('should throw an error if no update parameters are provided', async () => {
      // Mocking data
      const taskId = '1';
      const updateTaskInput: UpdateTaskInput = {
        id: taskId,
      };
  
      jest.spyOn(tasksService, 'findOneById').mockResolvedValueOnce(new Task());
  
      await expect(tasksService.update(updateTaskInput)).rejects.toThrowError('No update parameters provided');
    });
  });
  
});
  
  

