import { ContainersService } from '@app/services/containers/containers.service';

import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Req,
  Put,
  Res,
} from '@nestjs/common';

import { PrismaService } from '@infra/database/prisma.service';
import { AuthGuard } from '@app/services/auth/auth.guard';
import { Request, Response } from 'express';
import { ValidatorPipe } from '@app/utils/validators/pipes/validatorPipes';
import { CreateContainerSchema } from '@app/utils/validators/schemas/Container/container';
import { IContainerCreate } from '@domains/requests/container/container';

@Controller('containers')
export class ContainerController {
  constructor(
    private readonly prismaService: PrismaService,
    private containersService: ContainersService,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createContainer(
    @Body(new ValidatorPipe(CreateContainerSchema)) body: IContainerCreate,
  ) {
    await this.prismaService.$transaction(async (transaction) => {
      await this.containersService.create(body, transaction);
    });
  }

  @Get('all')
  @UseGuards(AuthGuard)
  async getAllUserContainers(@Req() req: Request, @Res() res: Response) {
    await this.prismaService.$transaction(async (transaction) => {
      const aq = await this.containersService.findMany(
        req.user.id,
        transaction,
      );

      res.json(aq).status(200);
    });
  }

  @Put('add/user')
  @UseGuards(AuthGuard)
  async addUserToContainer(@Body() body: any, @Req() req: Request) {
    await this.prismaService.$transaction(async (transaction) => {
      const { containerId, userId, userRoles } = body;

      await this.containersService.addUserToContainer(
        userId,
        containerId,
        transaction,
        userRoles,
      );
    });
  }
}
