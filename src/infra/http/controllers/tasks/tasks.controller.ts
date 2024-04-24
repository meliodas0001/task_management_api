import { Request, Response } from 'express';
import { Controller, Post, UseGuards, Body, Req, Res } from '@nestjs/common';

import { TaskCreateService } from '@app/useCases/tasks/taskCreate.service';
import { PrismaService } from '@infra/database/prisma.service';

import { AuthGuard } from '@app/services/auth/auth.guard';

@Controller('containers/folders/tasks')
export class TasksController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly taskCreateService: TaskCreateService,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createTask(
    @Body() body: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.prismaService.$transaction(async (transaction) => {
      const { name, description, folderId, status } = body;

      const task = {
        name,
        description,
        folderId,
        status,
        author: req.user.username,
      };

      this.taskCreateService.execute(task, transaction);
    });
  }
}
