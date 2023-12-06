import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { PersonsModule } from 'src/persons/persons.module';
import { PersonsService } from 'src/persons/persons.service';


@Module({
  imports: [TypeOrmModule.forFeature([Task]), PersonsModule],
  providers: [TasksResolver, TasksService],
  exports: [TasksService],

})
export class TasksModule {}
