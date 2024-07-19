import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Nova tarefa', description: 'O título da tarefa' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Descrição detalhada da tarefa',
    description: 'A descrição da tarefa',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: false,
    description: 'Status de conclusão da tarefa',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @ApiProperty({
    example: '2024-07-04',
    description: 'Data de quando é para ser executada no formato aaaa/mm/dd',
  })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({
    example: '13:00',
    description:
      'Horário de quando é para tarefa ser executada no formato hh:mm',
  })
  @IsNotEmpty()
  time?: string;
}
