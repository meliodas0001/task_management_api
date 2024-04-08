import { AuthService } from '@app/services/auth/auth.service';
import { ValidatorPipe } from '@app/utils/validators/pipes/validatorPipes';
import { AuthLoginSchema } from '@app/utils/validators/schemas/Auth/authLogin';
import { PrismaService } from '@infra/database/prisma.service';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

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
