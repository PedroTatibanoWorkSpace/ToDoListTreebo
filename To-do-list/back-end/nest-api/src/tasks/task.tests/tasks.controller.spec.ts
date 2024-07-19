import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

import { TaskEntity } from '../task.entity/tasks.entity';
import { TasksController } from '../task.controllers/tasks.controller';
import { TasksService } from '../task.services/tasks.service';

describe('Integração entre TasksController e TasksService', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [TaskEntity],
          synchronize: true,
        }),
      ],
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve criar uma tarefa', async () => {
    const createDto = {
      title: 'Nova Tarefa',
      description: 'Descrição da tarefa',
      date: '25/07/2024',
    } as any;
    const createdTask = { ...createDto, id: 1 } as TaskEntity;
    jest.spyOn(service, 'create').mockResolvedValue(createdTask);

    const result = await controller.create(createDto);
    expect(result).toEqual(createdTask);
  });

  it('deve encontrar todas as tarefas', async () => {
    const tasksList = [
      {
        id: 1,
        title: 'Tarefa 1',
        description: 'Descrição da tarefa',
        completed: false,
      },
    ] as TaskEntity[];
    jest.spyOn(service, 'findAll').mockResolvedValue(tasksList);

    const result = await controller.findAll();
    expect(result).toEqual(tasksList);
  });

  it('deve encontrar uma tarefa específica', async () => {
    const task = {
      id: 1,
      title: 'Tarefa 1',
      description: 'Descrição da tarefa',
      completed: false,
    } as TaskEntity;
    jest.spyOn(service, 'findOne').mockResolvedValue(task);

    const result = await controller.findOne('1');
    expect(result).toEqual(task);
  });

  it('deve atualizar uma tarefa', async () => {
    const updateDto = { title: 'Tarefa Atualizada' } as any;
    const updatedTask = {
      id: 1,
      title: 'Tarefa Atualizada',
      description: 'Descrição da tarefa',
      completed: false,
    } as TaskEntity;
    jest.spyOn(service, 'update').mockResolvedValue(updatedTask);

    const result = await controller.update('1', updateDto);
    expect(result).toEqual(updatedTask);
  });

  it('deve remover uma tarefa', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue();

    const result = await controller.remove('1');
    expect(result).toBeUndefined();
  });

  it('deve alternar a conclusão da tarefa', async () => {
    const toggledTask = {
      id: 1,
      title: 'Tarefa',
      description: 'Descrição da tarefa',
      completed: true,
    } as TaskEntity;
    jest.spyOn(service, 'toggleComplete').mockResolvedValue(toggledTask);

    const result = await controller.toggleComplete('1');
    expect(result).toEqual(toggledTask);
  });
});
