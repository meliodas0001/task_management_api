import { ApiProperty } from '@nestjs/swagger';

export abstract class IDeleteFolder {
  @ApiProperty({
    description: 'Id of the folder to be deleted',
    required: true,
    example: '69das95sc55667892',
  })
  folderId: string;

  @ApiProperty({
    description: 'Id of the folder container',
    required: true,
    example: '69das95sc55667892',
  })
  containerId: string;
}
