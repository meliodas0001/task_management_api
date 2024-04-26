import { ApiProperty } from '@nestjs/swagger';

export abstract class IDeleteTask {
  @ApiProperty({
    description: 'Id of the task to be deleted',
    example: '69das95sc55667892',
    required: true,
  })
  containerId: string;

  @ApiProperty({
    description: 'Id of the task to be deleted',
    example: '69das95sc55667892',
    required: true,
  })
  taskId: string;
}
