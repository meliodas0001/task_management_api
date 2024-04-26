import { Request, Response } from 'express';
import {
  Controller,
  Post,
  UseGuards,
  Body,
  Req,
  Res,
  Delete,
  Get,
  Put,
} from '@nestjs/common';
import { Roles as RolesEnum } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

import { TaskFindManyService } from '@app/useCases/tasks/taskFindMany.service';
import { TaskDeleteService } from '@app/useCases/tasks/taskDelete.service';
import { TaskCreateService } from '@app/useCases/tasks/taskCreate.service';
import { TaskUpdateService } from '@app/useCases/tasks/taskUpdate.service';
import { PrismaService } from '@infra/database/prisma.service';

import { ValidatorPipe } from '@app/utils/validators/pipes/validatorPipes';
import { AuthGuard } from '@app/guards/auth.guard';

import { FindManyTasksSchema } from '@app/utils/validators/schemas/Tasks/findMany';
import { UpdateTaskSchema } from '@app/utils/validators/schemas/Tasks/updateTask';
import { CreateTaskSchema } from '@app/utils/validators/schemas/Tasks/createTask';
import { DeleteTaskSchema } from '@app/utils/validators/schemas/Tasks/deleteTask';
import { ICreateTaskDTO } from '@domains/requests/tasks/tasksCreate';
import { ITasksUpdate } from '@domains/requests/tasks/tasksUpdate';
import { RolesGuard } from '@app/guards/roles.guard';
import { Roles } from '@app/decorators/roles.decorator';

import { IDeleteTask } from '@domains/requests/tasks/tasksDelete';
import { IFindMany } from '@domains/requests/tasks/tasksFindMany';

@ApiTags('Tasks')
@Controller('containers/folders/tasks')
export class TasksController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly taskCreateService: TaskCreateService,
    private readonly taskDeleteService: TaskDeleteService,
    private readonly taskFindManyService: TaskFindManyService,
    private readonly taksUpdateService: TaskUpdateService,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.Admin, RolesEnum.Moderator)
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.Admin, RolesEnum.Moderator)
  async deleteTask(
    @Body(new ValidatorPipe(DeleteTaskSchema)) body: IDeleteTask,
    @Res() res: Response,
  ) {
    const { taskId } = body;

    await this.prismaService.$transaction(async (transaction) => {
      await this.taskDeleteService.execute(taskId, transaction);
    });

    res.status(200).send();
  }

  @Get('findMany')
  @UseGuards(AuthGuard)
  async findManyTasks(
    @Body(new ValidatorPipe(FindManyTasksSchema)) body: IFindMany,
    @Res() res: Response,
  ) {
    await this.prismaService.$transaction(async (transaction) => {
      const tasks = await this.taskFindManyService.execute(
        body.folderId,
        transaction,
      );

      res.json(tasks).status(200);
    });
  }

  @Put('update')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.Moderator, RolesEnum.Admin)
  async updateTask(
    @Body(new ValidatorPipe(UpdateTaskSchema)) body: ITasksUpdate,
    @Res() res: Response,
  ) {
    await this.prismaService.$transaction(async (transaction) => {
      const { id, title, description, status, folderId } = body;

      await this.taksUpdateService.execute(
        {
          id,
          title,
          description,
          status,
          folderId,
        },
        transaction,
      );
    });

    res.status(200).send();
  }
}
