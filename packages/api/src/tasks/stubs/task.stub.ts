import { CreateTaskInput } from '../dto/create-task.input';
import { Task } from '../entities/task.entity';
import { UpdateTaskInput } from '../dto/update-task.input';

export const createTaskInputStub = (): CreateTaskInput => {
  return {
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
  };
};

export const updateTaskInputStub = (): UpdateTaskInput => {
  return {
    id: '1',
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
    completed: false,
  };
};

export const taskStub = (): Task => {
  return {
    id: '1',
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
    completed: false,
  }
};
