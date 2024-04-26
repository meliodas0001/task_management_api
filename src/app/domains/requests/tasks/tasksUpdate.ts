import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';

export abstract class ITasksUpdate {
  @ApiProperty({
    example: '123456789',
    description: 'The id of the container of the task',
    required: true,
  })
  containerId?: string;

  @ApiProperty({
    example: '123456789',
    description: 'The id of the task',
  })
  id: string;

  @ApiProperty({
    example: 'Task title',
    description: 'The title of the task',
  })
  title: string;

  @ApiProperty({
    example: 'Task description',
    description: 'The description of the task',
  })
  description: string;

  @ApiProperty({
    example: '123456789',
    description: 'The id of the folder of the task',
  })
  folderId: string;

  @ApiProperty({
    example: Status.Open,
    description: 'The status of the task',
    enum: Status,
  })
  status: Status;
}
