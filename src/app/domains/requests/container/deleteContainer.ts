import { ApiProperty } from '@nestjs/swagger';

export abstract class IDeleteContainer {
  @ApiProperty({
    description: 'id of the container',
    example: '69das95sc55667892',
  })
  containerId: string;
}
