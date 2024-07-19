import { IsBoolean, IsDateString, IsOptional } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    example: 'Tarefa atualizada',
    description: 'O título da tarefa',
  })
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    example: 'Descrição atualizada da tarefa',
    description: 'A descrição da tarefa',
  })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Status de conclusão atualizado da tarefa',
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @ApiPropertyOptional({
    example: '2024-07-04',
    description: 'Data de quando é para ser executada no formato aaaa/mm/dd',
  })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({
    example: '13:00',
    description:
      'Horário de quando é para tarefa ser executada no formato hh:mm',
  })
  @IsOptional()
  time?: string;
}
