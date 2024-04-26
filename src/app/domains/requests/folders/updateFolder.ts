import { ApiProperty } from '@nestjs/swagger';

export abstract class IUpdateFolder {
  @ApiProperty({
    example: '1',
    description: 'Folder id',
    required: true,
  })
  containerId?: string;

  @ApiProperty({
    example: '1',
    description: 'Folder id',
    required: true,
  })
  id: string;

  @ApiProperty({
    example: 'Folder name',
    description: 'Folder name',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: 'Folder description',
    description: 'Folder description',
    required: true,
  })
  description: string;
}
