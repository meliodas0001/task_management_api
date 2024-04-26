import { ApiProperty } from '@nestjs/swagger';

export abstract class IUserCreate {
  @ApiProperty({
    description: 'The user username',
    example: 'johndoe12',
  })
  username: string;

  @ApiProperty({
    description: 'The user email',
    example: 'johndoe@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'The user password',
    example: '12345678',
  })
  password: string;
}
