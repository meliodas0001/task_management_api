import { ContainersService } from '@app/services/containers/containers.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma.service';
import { AuthGuard } from '@app/services/auth/auth.guard';
import { Request } from 'express';

@Controller('containers')
export class ContainerController {
  constructor(
    private readonly prismaService: PrismaService,
    private containersService: ContainersService,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createContainer(@Body() body: any, req: Request) {
    console.log(req);

    await this.prismaService.$transaction(async (transaction) => {
      await this.containersService.create(body, transaction);
    });
  }
}
