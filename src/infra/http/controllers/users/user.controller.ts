import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateUserSchema } from '@app/utils/validators/schemas/User/createUser';
import { ValidatorPipe } from '@app/utils/validators/pipes/validatorPipes';
import { UserService } from '@app/services/user/user.service';
import { PrismaService } from '../../../database/prisma.service';
import { IUserCreate } from '@domains/requests/users/users';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private prismaService: PrismaService,
  ) {}

  @Get('/:userId')
  getUserById(@Param('userId') id: string) {
    return `This action returns a #${id} user`;
  }

  @Post('/create')
  async createUser(
    @Body(new ValidatorPipe(CreateUserSchema)) body: IUserCreate,
  ) {
    await this.prismaService.$transaction(async (transaction) => {
      return await this.userService.createUser(body, transaction);
    });

    return 201;
  }
}
