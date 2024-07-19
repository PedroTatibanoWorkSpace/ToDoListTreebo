import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'O ID único da tarefa' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Nova tarefa', description: 'O título da tarefa' })
  title: string;

  @Column()
  @ApiProperty({
    example: 'Descrição detalhada da tarefa',
    description: 'A descrição da tarefa',
  })
  description: string;

  @Column({ default: false })
  @ApiProperty({
    example: false,
    description: 'Status de conclusão da tarefa',
    default: false,
  })
  completed: boolean;

  @Column({ nullable: true })
  @ApiProperty({
    example: '01/07/2024',
    description: 'Data de quando é para ser executada no formato dd/mm/aaaa',
  })
  date?: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: '13:00',
    description:
      'Horario de quando é para tarefa ser executada no formato hh:mm',
  })
  time?: string;
}
