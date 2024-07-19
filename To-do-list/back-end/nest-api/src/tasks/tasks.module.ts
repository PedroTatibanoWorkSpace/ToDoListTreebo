import { Module } from '@nestjs/common';
import { TaskEntity } from './task.entity/tasks.entity';
import { TasksController } from './task.controllers/tasks.controller';
import { TasksService } from './task.services/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
