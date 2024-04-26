import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@prisma/client';

export abstract class IContainerCreate {
  @ApiProperty({
    description: 'Name of the container',
    example: 'Container Name',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the container',
    example: 'Container Description',
  })
  description: string;

  @ApiProperty({
    description: 'Id of the user that owns the container',
    example: '1',
  })
  ownerId: string;
}

export abstract class IAddUserToContainer {
  @ApiProperty({
    description: 'Id of the user to add to the container',
    example: '1',
  })
  userId: string;

  @ApiProperty({
    description: 'Id of the container to add the user to',
    example: '1',
  })
  containerId: string;

  @ApiProperty({
    description: 'Role of the user to add to the container',
    example: 'Admin',
    enum: Roles,
  })
  userRole?: Roles;
}
