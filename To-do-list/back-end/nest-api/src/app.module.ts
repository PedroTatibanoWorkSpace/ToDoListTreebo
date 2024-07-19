import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'PedroTatibano',
      password: process.env.PASSWORD_DATABASE,
      database: 'TreeboTest',
      autoLoadEntities: true,
      synchronize: false,
    }),

    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
