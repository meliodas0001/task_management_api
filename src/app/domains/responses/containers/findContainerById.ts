import { ApiResponseProperty } from '@nestjs/swagger';

export abstract class IUserResponse {
  @ApiResponseProperty({
    type: 'string',
    example: 'a2793b11-cbf6-406c-bab9-486f68227c9c',
  })
  public abstract id: string;

  @ApiResponseProperty({
    type: 'string',
    example: 'johndoe',
  })
  public abstract username: string;

  @ApiResponseProperty({
    type: 'string',
    example: 'johndoe@gmail.com',
  })
  public abstract email: string;
}

export abstract class IFindContainerByIdResponse {
  @ApiResponseProperty({
    type: 'string',
    example: 'a2793b11-cbf6-406c-bab9-486f68227c9c',
  })
  public id: string;

  @ApiResponseProperty({
    type: 'string',
    example: 'Container name',
  })
  public name: string;

  @ApiResponseProperty({
    type: 'string',
    example: 'Container description',
  })
  public description: string;

  @ApiResponseProperty({
    type: 'string',
    example: 'a2793b11-cbf6-406c-bab9-486f68227c9c',
  })
  public ownerId: string;

  @ApiResponseProperty({
    type: 'boolean',
    example: true,
  })
  public public: boolean;
  public users: IUserResponse[];
}
