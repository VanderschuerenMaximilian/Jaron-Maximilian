// import { Test, TestingModule } from '@nestjs/testing';
// import { TasksResolver } from './tasks.resolver';
// import { TasksService } from './tasks.service';
// import { PersonsService } from 'src/persons/persons.service';
// import { Task } from './entities/task.entity';
// import { Repository } from 'typeorm';
// import { getRepositoryToken } from '@nestjs/typeorm';

// describe('TasksResolver', () => {
//   let resolver: TasksResolver;
//   let mockRepository: Repository<Task>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         TasksResolver,
//         TasksService,
//         PersonsService,
//         {
//           provide: getRepositoryToken(Task),
//           useValue: {
//             save: jest.fn().mockImplementation((task) => Promise.resolve({ ...task, createdAt: new Date() })),
//             update: jest.fn().mockResolvedValue(Task),
//             find: jest.fn().mockResolvedValue([Task]),
//             findOne: jest.fn().mockResolvedValue(Task),
//           },
//         },
//       ],
//     }).compile();

//     resolver = module.get<TasksResolver>(TasksResolver);
//     mockRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
//   });

//   it('should be defined', () => {
//     expect(resolver).toBeDefined();
//   });
// });
