import { ApiProperty } from '@nestjs/swagger';

export abstract class IFindMany {
  @ApiProperty({
    description: 'The id of the folder',
    example: '69das95sc55667892',
  })
  folderId: string;
}
