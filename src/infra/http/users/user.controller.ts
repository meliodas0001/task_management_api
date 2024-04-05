import { UserEntity } from '@domains/database/entities/User/UserEntity';
import { UserService } from '@domains/services/user/user.service';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
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
  async createUser(@Body() user, @Res() res: Response): Promise<void> {
    await this.prismaService.$transaction(async (transaction) => {
      return await this.userService.createUser(user, transaction);
    });

    res.status(201);
  }
}
