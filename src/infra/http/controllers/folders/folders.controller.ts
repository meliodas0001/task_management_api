import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { Roles as roles } from '@prisma/client';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { CreateFolderService } from '@app/useCases/folders/createFolder.service';
import { PrismaService } from '@infra/database/prisma.service';

import { FoldersCreateSchema } from '@app/utils/validators/schemas/Folders/createFolder';
import { DeleteFolderSchema } from '@app/utils/validators/schemas/Folders/deleteFolder';
import { UpdateFolderSchema } from '@app/utils/validators/schemas/Folders/updateFolder';
import { ValidatorPipe } from '@app/utils/validators/pipes/validatorPipes';

import { RolesGuard } from '@app/guards/roles.guard';
import { AuthGuard } from '@app/guards/auth.guard';

import { FindManyFoldersService } from '@app/useCases/folders/findManyFolders.service';
import { DeleteFolderService } from '@app/useCases/folders/deleteFolder.service';
import { UpdateFolderService } from '@app/useCases/folders/updateFolder.service';
import { IUpdateFolder } from '@domains/requests/folders/updateFolder';
import { ICreateFolder } from '@domains/requests/folders/createFolder';
import { IDeleteFolder } from '@domains/requests/folders/deleteFolder';
import { Roles } from '@app/decorators/roles.decorator';

@ApiTags('Folders')
@Controller('containers/folders')
export class FoldersController {
  constructor(
    private prismaService: PrismaService,
    private readonly createFolderService: CreateFolderService,
    private readonly deleteFolderService: DeleteFolderService,
    private readonly findManyFoldersService: FindManyFoldersService,
    private readonly updateFolderService: UpdateFolderService,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(roles.Admin, roles.Moderator)
  async createFolder(
    @Body(new ValidatorPipe(FoldersCreateSchema)) body: ICreateFolder,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.prismaService.$transaction(async (transaction) => {
      const { name, description, containerId } = body;

      const folder = {
        name,
        containerId,
        description: description ? description : ' ',
        author: req.user.username,
      };

      await this.createFolderService.execute(folder, transaction);
    });

    res.status(201).send();
  }

  @Delete('delete')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(roles.Admin, roles.Moderator)
  async deleteFolder(
    @Body(new ValidatorPipe(DeleteFolderSchema)) body: IDeleteFolder,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { folderId } = body;

    await this.prismaService.$transaction(async (transaction) => {
      await this.deleteFolderService.execute(folderId, transaction);
    });

    res.status(201).send();
  }

  @Get('findMany')
  @UseGuards(AuthGuard)
  async findMany(@Body() body: any, @Req() req: Request, @Res() res: Response) {
    const { containerId } = body;

    await this.prismaService.$transaction(async (transaction) => {
      const foldersList = await this.findManyFoldersService.execute(
        containerId,
        transaction,
      );

      res.json(foldersList).status(200).send();
    });
  }

  @Put('update')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(roles.Admin, roles.Moderator)
  async updateFolder(
    @Body(new ValidatorPipe(UpdateFolderSchema)) body: IUpdateFolder,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { id, name, description } = body;

    await this.prismaService.$transaction(async (transaction) => {
      await this.updateFolderService.execute(
        {
          id,
          name,
          description,
        },
        transaction,
      );
    });

    res.status(200).send();
  }
}
