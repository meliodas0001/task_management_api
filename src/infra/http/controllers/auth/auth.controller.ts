import { AuthGuard } from '@app/services/auth/auth.guard';
import { AuthService } from '@app/services/auth/auth.service';
import { ValidatorPipe } from '@app/utils/validators/pipes/validatorPipes';
import { AuthLoginSchema } from '@app/utils/validators/schemas/Auth/authLogin';
import { ILogin } from '@domains/requests/auth/login';
import { PrismaService } from '@infra/database/prisma.service';
import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private prismaService: PrismaService,
  ) {}

  @Post('/login')
  async login(
    @Body(new ValidatorPipe(AuthLoginSchema)) body: ILogin,
    @Res() res: Response,
  ) {
    await this.prismaService.$transaction(async (transaction) => {
      const token = await this.authService.login(body, transaction);

      res.status(200).json(token);
    });
  }
}
