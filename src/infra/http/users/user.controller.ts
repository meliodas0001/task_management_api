import { IUserCreate } from '@domains/requests/users/users';
import { UserService } from '@domains/services/user/user.service';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ValidatorPipe } from 'src/app/utils/validators/pipes/validatorPipes';
import { CreateUserSchema } from 'src/app/utils/validators/schemas/User/createUser';
import { PrismaService } from 'src/infra/database/prisma.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private prismaService: PrismaService,
  ) {}

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return `This action returns a #${id} user`;
  }

  @Post('/create')
  async createUser(
    @Body(new ValidatorPipe(CreateUserSchema)) body: IUserCreate,
    @Res() res: Response,
  ): Promise<void> {
    await this.prismaService.$transaction(async (transaction) => {
      return await this.userService.createUser(body, transaction);
    });

    res.json().status(201);
  }
}
