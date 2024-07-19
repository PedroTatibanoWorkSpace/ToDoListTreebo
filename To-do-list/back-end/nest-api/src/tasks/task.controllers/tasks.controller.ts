import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from '../task.services/tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto/update-task.dto';
import { TaskEntity } from '../task.entity/tasks.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Adicionar nova tarefa' })
  @ApiResponse({
    status: 201,
    description: 'Tarefa criada com sucesso.',
    type: TaskEntity,
  })
  @ApiBody({ type: CreateTaskDto })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksService.create(createTaskDto);
  }

  @ApiOperation({ summary: 'Buscar somente uma tarefa' })
  @ApiResponse({
    status: 200,
    description: 'Tarefa retornada com sucesso.',
    type: [TaskEntity],
  })
  @ApiParam({ name: 'id', type: String, description: 'ID da tarefa' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<TaskEntity> {
    return this.tasksService.findOne(+id);
  }
  @ApiOperation({ summary: 'Listar todas as tarefas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarefas retornada com sucesso.',
    type: [TaskEntity],
  })
  @Get()
  findAll(): Promise<TaskEntity[]> {
    return this.tasksService.findAll();
  }

  @ApiOperation({ summary: 'Editar uma tarefa existente' })
  @ApiResponse({
    status: 200,
    description: 'Tarefa atualizada com sucesso.',
    type: TaskEntity,
  })
  @ApiParam({ name: 'id', type: String, description: 'ID da tarefa' })
  @ApiBody({ type: UpdateTaskDto })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskEntity> {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @ApiOperation({ summary: 'Excluir uma tarefa' })
  @ApiResponse({ status: 200, description: 'Tarefa excluída com sucesso.' })
  @ApiParam({ name: 'id', type: String, description: 'ID da tarefa' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(+id);
  }

  @ApiOperation({ summary: 'Marcar tarefa como concluída' })
  @ApiResponse({
    status: 200,
    description: 'Tarefa marcada/desmarcada como concluída com sucesso.',
    type: TaskEntity,
  })
  @ApiParam({ name: 'id', type: String, description: 'ID da tarefa' })
  @Patch(':id/toggle')
  toggleComplete(@Param('id') id: string): Promise<TaskEntity> {
    return this.tasksService.toggleComplete(+id);
  }
}
