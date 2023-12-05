import { Test, TestingModule } from '@nestjs/testing';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';
import { PersonsService } from 'src/persons/persons.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

describe('TasksResolver', () => {
  let resolver: TasksResolver;
  let tasksService: TasksService;
  let personsService: PersonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksResolver,
        {
          provide: TasksService,
          useValue: {
            // Mock de benodigde methods van TasksService
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: PersonsService,
          useValue: {
            findOneById: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<TasksResolver>(TasksResolver);
    tasksService = module.get<TasksService>(TasksService);
    personsService = module.get<PersonsService>(PersonsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });


  describe('createTask', () => {
    it('should create and return a task', async () => {
      const createTaskInput: CreateTaskInput = {
        persons: null,
        title: 'Example Task',
        shopName: 'Boomerang Snack',
        description: 'Example description',
        stockItems: [
          { name: 'Item1', difference: 10 },
          { name: 'Item2', difference: 5 },
        ],
        workblockId: '',
        createdAt: undefined
      };
  
      const createdTask: Task = {
        id: "1",
        ...createTaskInput,
        completed: false
      };
  
      jest.spyOn(tasksService, 'create').mockResolvedValueOnce(createdTask);
  
      const result = await resolver.createTask(createTaskInput);
  
      expect(result).toBe(createdTask);
      expect(tasksService.create).toHaveBeenCalledWith(createTaskInput);
    });

    it('should throw an error when the task could not be created', async () => {
      const createTaskInput: CreateTaskInput = {
        persons: null,
        title: 'Example Task',
        shopName: 'Boomerang Snack',
        description: 'Example description',
        stockItems: [
          { name: 'Item1', difference: 10 },
          { name: 'Item2', difference: 5 },
        ],
        workblockId: '',
        createdAt: undefined
      };
  
      jest.spyOn(tasksService, 'create').mockRejectedValueOnce(new Error('Could not create task'));
  
      await expect(resolver.createTask(createTaskInput)).rejects.toThrowError('Could not create task');
    });

  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks: Task[] = [
        {
          id: "1",
          persons: null,
          title: 'Example Task',
          shopName: 'Boomerang Snack',
          description: 'Example description',
          stockItems: [
            { name: 'Item1', difference: 10 },
            { name: 'Item2', difference: 5 },
          ],
          workblockId: '',
          createdAt: undefined,
          completed: false
        },
        {
          id: "2",
          persons: null,
          title: 'Example Task 2',
          shopName: 'Boomerang Snack',
          description: 'Example description',
          stockItems: [
            { name: 'Item1', difference: 10 },
            { name: 'Item2', difference: 5 },
          ],
          workblockId: '',
          createdAt: undefined,
          completed: false
        },
      ];
  
      jest.spyOn(tasksService, 'findAll').mockResolvedValueOnce(tasks);
  
      const result = await resolver.findAll();
  
      expect(result).toBe(tasks);
      expect(tasksService.findAll).toHaveBeenCalled();
    });

    it('should throw an error when the tasks could not be found', async () => {
      jest.spyOn(tasksService, 'findAll').mockRejectedValueOnce(new Error('Could not find tasks'));
  
      await expect(resolver.findAll()).rejects.toThrowError('Could not find tasks');
    });
  });

  describe('updateTask', () => {
    it('should update and return a task', async () => {
      const updateTaskInput: UpdateTaskInput = {
        id: '',
        persons: null,
        title: 'Example Task',
        shopName: 'Boomerang Snack',
        description: 'Example description',
        stockItems: [
          { name: 'Item1', difference: 10 },
          { name: 'Item2', difference: 5 },
        ],
        workblockId: '',
        createdAt: undefined,
        completed: false
      };
    
      const updatedTask: Task = {
        id: '1',
        persons: null,
        workblockId: '',
        title: '',
        description: '',
        completed: false,
        createdAt: undefined,
        shopName: '',
        stockItems: []
      };
    
      jest.spyOn(tasksService, 'update').mockResolvedValueOnce(updatedTask);
    
      const result = await resolver.updateTask(updateTaskInput);
    
      expect(result).toBe(updatedTask);
      expect(tasksService.update).toHaveBeenCalledWith(updateTaskInput);
    });
    
    it('should throw an error when the task could not be updated', async () => {
      const updateTaskInput: UpdateTaskInput = {
        id: "1",
        persons: null,
        title: 'Example Task',
        shopName: 'Boomerang Snack',
        description: 'Example description',
        stockItems: [
          { name: 'Item1', difference: 10 },
          { name: 'Item2', difference: 5 },
        ],
        workblockId: '',
        createdAt: undefined,
        completed: false
      };
  
      jest.spyOn(tasksService, 'update').mockRejectedValueOnce(new Error('Could not update task'));
  
      await expect(resolver.updateTask(updateTaskInput)).rejects.toThrowError('Could not update task');
    });

  });

});
