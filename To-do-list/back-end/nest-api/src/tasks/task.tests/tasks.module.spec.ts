import { Test, TestingModule } from '@nestjs/testing';

import { TaskEntity } from '../task.entity/tasks.entity';
import { TasksModule } from '../tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('TasksModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TasksModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [TaskEntity],
          synchronize: true,
        }),
      ],
    }).compile();
  });

  it('deve ser definido', () => {
    expect(module).toBeDefined();
  });
});
