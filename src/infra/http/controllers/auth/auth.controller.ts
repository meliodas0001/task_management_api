import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from '@app/services/auth/auth.service';
import { ValidatorPipe } from '@app/utils/validators/pipes/validatorPipes';
import { AuthLoginSchema } from '@app/utils/validators/schemas/Auth/authLogin';
import { ILogin, ILoginResponse } from '@domains/requests/auth/login';
import { PrismaService } from '@infra/database/prisma.service';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserSchema } from '@app/utils/validators/schemas/User/createUser';
import { IUserCreate } from '@domains/requests/users/users';
import { UserService } from '@app/services/user/user.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  @Post('/login')
  @ApiResponse({
    status: 200,
    description: 'Login',
    type: ILoginResponse,
  })
  async login(
    @Body(new ValidatorPipe(AuthLoginSchema)) body: ILogin,
    @Res() res: Response,
  ) {
    await this.prismaService.$transaction(async (transaction) => {
      const token = await this.authService.login(body, transaction);

      res.status(200).json(token);
    });
  }

  @Post('/signin')
  async signin(@Body(new ValidatorPipe(CreateUserSchema)) body: IUserCreate) {
    await this.prismaService.$transaction(async (transaction) => {
      return await this.userService.createUser(body, transaction);
    });

    return 201;
  }
}
