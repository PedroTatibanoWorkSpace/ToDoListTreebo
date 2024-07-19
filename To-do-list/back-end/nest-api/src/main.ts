import * as Sentry from '@sentry/node';
import * as dotenv from 'dotenv';

import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();

  Sentry.init({
    dsn: process.env.SENTRY_DSN || '',
    tracesSampleRate: 1.0,
  });

  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  Sentry.setupNestErrorHandler(app, new BaseExceptionFilter(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle('To-do-list')
    .setDescription('API para teste da treebo')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
  };
  app.enableCors(corsOptions);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(200);
}

bootstrap();
