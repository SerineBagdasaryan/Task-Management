import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Task } from './entities/task.entity';
import { TaskRepository } from './entities/task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskRepository]), ConfigModule],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
  exports: [TasksService, TaskRepository],
})
export class TasksModule {}
