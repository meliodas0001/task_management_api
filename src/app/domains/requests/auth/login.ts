import { ApiProperty } from '@nestjs/swagger';

export abstract class ILogin {
  @ApiProperty({
    description: 'The user email',
    example: 'johndoe@gmail.com',
  })
  public email: string;

  @ApiProperty({
    description: 'The user password',
    example: '12345678',
  })
  public password: string;
}
