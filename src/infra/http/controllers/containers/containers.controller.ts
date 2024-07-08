import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Req,
  Put,
  Res,
  Delete,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Request, Response } from 'express';

import { ValidatorPipe } from '@app/utils/validators/pipes/validatorPipes';
import { PrismaService } from '@infra/database/prisma.service';
import { AuthGuard } from '@app/guards/auth.guard';

import {
  AddUserContainerSchema,
  CreateContainerSchema,
  UpdateUserRoleSchema,
} from '@app/utils/validators/schemas/Container/container';

import {
  IAddUserToContainer,
  IContainerCreate,
} from '@domains/requests/container/container';

import { AddUserToContainerService } from '@app/useCases/container/addUserToContainer.service';
import { CreateContainerService } from '@app/useCases/container/createContainer.service';
import { DeleteContainerService } from '@app/useCases/container/deleteContainer.service';
import { FindManyContainersService } from '@app/useCases/container/findManyContainers.service';
import { GetContainerByIdService } from '@app/useCases/container/getContainerById.service';
import { UpdateUserRolesService } from '@app/useCases/container/updateUserRole.service';
import { DeleteContainerSchema } from '@app/utils/validators/schemas/Container/deleteContainer';
import { RolesGuard } from '@app/guards/roles.guard';
import { Roles } from '@app/decorators/roles.decorator';
import { Roles as roles } from '@prisma/client';

import { IDeleteContainer } from '@domains/requests/container/deleteContainer';
import { IFindContainerByIdResponse } from '@domains/responses/containers/findContainerById';
import {
  ContainerFindByIdSchema,
  IContainerFindById,
} from '@app/utils/validators/schemas/Container/containerFindById';
import {
  IUpdateContainerSchema,
  UpdateContainerSchema,
} from '@domains/requests/container/updateContainer';
import { UpdateContainerService } from '@app/useCases/container/updateContainer.service';

@ApiTags('Containers')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('containers')
export class ContainerController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly addUserToContainerService: AddUserToContainerService,
    private readonly createContainerService: CreateContainerService,
    private readonly deleteContainerService: DeleteContainerService,
    private readonly findManyContainersService: FindManyContainersService,
    private readonly getContainerByIdService: GetContainerByIdService,
    private readonly updateUserRolesService: UpdateUserRolesService,
    private readonly updateContainerService: UpdateContainerService,
  ) {}

  @Get('findById')
  @ApiResponse({
    type: IFindContainerByIdResponse,
    status: 200,
  })
  @ApiBadRequestResponse({
    description: 'Container not found or user does not have access to it.',
    status: 401,
  })
  @Roles(roles.User, roles.Admin, roles.Moderator)
  async getContainerById(
    @Body(new ValidatorPipe(ContainerFindByIdSchema)) body: IContainerFindById,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { containerId } = body;

    await this.prismaService.$transaction(async (transaction) => {
      const container = await this.getContainerByIdService.execute(
        containerId,
        req.user.id,
        transaction,
      );

      res.json(container).status(200);
    });
  }

  @Delete('delete')
  @UseGuards(RolesGuard)
  @Roles(roles.Admin)
  async deleteContainer(
    @Body(new ValidatorPipe(DeleteContainerSchema)) body: IDeleteContainer,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.prismaService.$transaction(async (transaction) => {
      await this.deleteContainerService.execute(
        body.containerId,
        req.user.id,
        transaction,
      );

      res.status(200).send();
    });
  }

  @Post('create')
  async createContainer(
    @Body(new ValidatorPipe(CreateContainerSchema)) body: IContainerCreate,
    @Req() Req: Request,
  ) {
    await this.prismaService.$transaction(async (transaction) => {
      await this.createContainerService.execute(body, Req.user.id, transaction);
    });
  }

  @Get('all')
  async getAllUserContainers(@Req() req: Request, @Res() res: Response) {
    await this.prismaService.$transaction(async (transaction) => {
      const containers = await this.findManyContainersService.execute(
        req.user.id,
        transaction,
      );

      res.json(containers).status(200);
    });
  }

  @Put('add/user')
  @UseGuards(RolesGuard)
  @Roles(roles.Admin)
  async addUserToContainer(
    @Body(new ValidatorPipe(AddUserContainerSchema)) body: IAddUserToContainer,
  ) {
    await this.prismaService.$transaction(async (transaction) => {
      const { containerId, userId, userRole } = body;

      await this.addUserToContainerService.execute(
        userId,
        containerId,
        transaction,
        userRole,
      );
    });
  }

  @Put('update/user/role')
  @UseGuards(RolesGuard)
  @Roles(roles.Admin)
  async updateUserRole(
    @Body(new ValidatorPipe(UpdateUserRoleSchema)) body: IAddUserToContainer,
  ) {
    await this.prismaService.$transaction(async (transaction) => {
      const { containerId, userId, userRole } = body;

      await this.updateUserRolesService.execute(
        containerId,
        userId,
        userRole,
        transaction,
      );
    });
  }

  @Put('update')
  @UseGuards(RolesGuard)
  @Roles(roles.Admin)
  async updateContainer(
    @Body(new ValidatorPipe(UpdateContainerSchema))
    body: IUpdateContainerSchema,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.prismaService.$transaction(async (transaction) => {
      await this.updateContainerService.execute(body, transaction);
    });

    res.status(200).send();
  }
}
