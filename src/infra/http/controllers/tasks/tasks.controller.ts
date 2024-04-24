import { Request, Response } from 'express';
import {
  Controller,
  Post,
  UseGuards,
  Body,
  Req,
  Res,
  Delete,
} from '@nestjs/common';

import { TaskCreateService } from '@app/useCases/tasks/taskCreate.service';
import { PrismaService } from '@infra/database/prisma.service';

import { AuthGuard } from '@app/services/auth/auth.guard';
import { ValidatorPipe } from '@app/utils/validators/pipes/validatorPipes';

import { CreateTaskSchema } from '@app/utils/validators/schemas/Tasks/createTask';
import { ICreateTaskDTO } from '@domains/requests/tasks/tasksCreate';
import { TaskDeleteService } from '@app/useCases/tasks/taskDelete.service';

@Controller('containers/folders/tasks')
export class TasksController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly taskCreateService: TaskCreateService,
    private readonly taskDeleteService: TaskDeleteService,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createTask(
    @Body(new ValidatorPipe(CreateTaskSchema)) body: ICreateTaskDTO,
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

      await this.taskCreateService.execute(task, transaction);

      res.status(201).send();
    });
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  async deleteTask(
    @Body() body: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { taskId } = body;

    await this.prismaService.$transaction(async (transaction) => {
      await this.taskDeleteService.execute(taskId, transaction);
    });
  }
}
