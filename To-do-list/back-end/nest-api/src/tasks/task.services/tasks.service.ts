import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from '../task.entity/tasks.entity';
import { CreateTaskDto } from '../dto/create-task.dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {}

  private getId(id: number): number {
    return id;
  }

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const task = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(task);
  }

  async findOne(id: number): Promise<TaskEntity> {
    const task = await this.tasksRepository.findOne({
      where: { id: this.getId(id) },
    });
    if (!task) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }
    return task;
  }

  async findAll(): Promise<TaskEntity[]> {
    return this.tasksRepository.find();
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    try {
      const task = await this.tasksRepository.findOne({
        where: { id: this.getId(id) },
      });

      if (!task) {
        throw new NotFoundException(`Tarefa com ID ${id} não encontrada.`);
      }

      if (updateTaskDto.title !== undefined) {
        task.title = updateTaskDto.title;
      }

      if (updateTaskDto.description !== undefined) {
        task.description = updateTaskDto.description;
      }

      if (updateTaskDto.completed !== undefined) {
        task.completed = updateTaskDto.completed;
      }

      if (updateTaskDto.date !== undefined) {
        task.date = updateTaskDto.date;
      }

      if (updateTaskDto.time !== undefined) {
        task.time = updateTaskDto.time;
      }

      return this.tasksRepository.save(task);
    } catch (error) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada.`);
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada.`);
    }
  }

  async toggleComplete(id: number): Promise<TaskEntity> {
    try {
      const task = await this.tasksRepository.findOne({
        where: { id: this.getId(id) },
      });

      if (!task) {
        throw new NotFoundException(`Tarefa com ID ${id} não encontrada.`);
      }

      task.completed = !task.completed;

      return this.tasksRepository.save(task);
    } catch (error) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada.`);
    }
  }
}
