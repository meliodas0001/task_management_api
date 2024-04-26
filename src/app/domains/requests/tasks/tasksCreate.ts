import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';

export abstract class ICreateTaskDTO {
  @ApiProperty({
    example: '1',
    description: 'The id of the container',
    required: true,
  })
  containerId?: string;

  @ApiProperty({
    example: 'Task 1',
    description: 'The name of the task',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: 'Task description',
    description: 'The description of the task',
    required: true,
  })
  description: string;

  @ApiProperty({
    example: '1',
    description: 'The id of the folder',
    required: true,
  })
  folderId: string;

  @ApiProperty({
    example: 'johndoe',
    description: 'The username of the author',
    required: true,
  })
  author: string;

  @ApiProperty({
    example: Status.Open,
    description: 'The status of the task',
    required: true,
    enum: Status,
  })
  status: Status;
}
