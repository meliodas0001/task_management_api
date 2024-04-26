import { ApiProperty } from '@nestjs/swagger';

export abstract class ICreateFolder {
  @ApiProperty({
    description: 'Name of the folder',
    example: 'Folder Name',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the folder',
    example: 'Description of the folder',
  })
  description?: string;

  @ApiProperty({
    description: 'Id of the folder container',
    example: 'Folder Container Id',
  })
  containerId: string;

  @ApiProperty({
    description: 'Author of the folder',
    example: 'Author of the folder',
  })
  author: string;
}
