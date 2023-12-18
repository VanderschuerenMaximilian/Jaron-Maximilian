import { Test, TestingModule } from '@nestjs/testing';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';
import { PersonsService } from 'src/persons/persons.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { createTaskInputStub, taskStub, updateTaskInputStub } from './stubs/task.stub';

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
      const testTask: CreateTaskInput = createTaskInputStub();
  
      const createdTask: Task = {
        id: "1",
        ...testTask,
        completed: false
      };
  
      jest.spyOn(tasksService, 'create').mockResolvedValueOnce(createdTask);
  
      const result = await resolver.createTask(testTask);
  
      expect(result).toBe(createdTask);
      expect(tasksService.create).toHaveBeenCalledWith(testTask);
    });

    it('should throw an error when the task could not be created', async () => {
      const testTask: CreateTaskInput = createTaskInputStub();

  
      jest.spyOn(tasksService, 'create').mockRejectedValueOnce(new Error('Could not create task'));
  
      await expect(resolver.createTask(testTask)).rejects.toThrowError('Could not create task');
    });

  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks: Task[] = [
        taskStub(),
        taskStub(),
      ];
  
      jest.spyOn(tasksService, 'findAll').mockResolvedValueOnce(tasks);
  
      const result = await resolver.findAll();
  
      expect(result).toEqual(tasks);
      expect(tasksService.findAll).toHaveBeenCalled();
    });

    it('should throw an error when the tasks could not be found', async () => {
      jest.spyOn(tasksService, 'findAll').mockRejectedValueOnce(new Error('Could not find tasks'));
  
      await expect(resolver.findAll()).rejects.toThrowError('Could not find tasks');
    });
  });

  describe('updateTask', () => {
    it('should update and return a task', async () => {
      const existingTask: Task = taskStub();
      const updateTaskInput: UpdateTaskInput = updateTaskInputStub();
      const updatedTask: Task = {
        ...existingTask,
        ...updateTaskInput,
      };
  
    
      jest.spyOn(tasksService, 'update').mockResolvedValueOnce(updatedTask);

    const result = await resolver.updateTask(updateTaskInput);

    expect(result).toEqual(updatedTask);
    expect(tasksService.update).toHaveBeenCalledWith(updateTaskInput);
  });
    
  it('should throw an error when the task could not be updated', async () => {
    const updateTaskInput: UpdateTaskInput = updateTaskInputStub();
  
    jest.spyOn(tasksService, 'update').mockRejectedValueOnce(new Error('Could not update task'));
  
    await expect(resolver.updateTask(updateTaskInput)).rejects.toThrowError(/could not update task/i);
  });

  });

});
