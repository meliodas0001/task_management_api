import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { CreateFolderService } from '@app/useCases/folders/createFolder.service';

import { FoldersCreateSchema } from '@app/utils/validators/schemas/Folders/folders';
import { ValidatorPipe } from '@app/utils/validators/pipes/validatorPipes';

import { PrismaService } from '@infra/database/prisma.service';
import { AuthGuard } from '@app/services/auth/auth.guard';

@Controller('containers/folders')
export class FoldersController {
  constructor(
    private prismaService: PrismaService,
    private readonly createFolderService: CreateFolderService,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createFolder(
    @Body(new ValidatorPipe(FoldersCreateSchema)) body: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.prismaService.$transaction(async (transaction) => {
      const { name, description, containerId, status } = body;

      const folder = {
        name,
        containerId,
        description: description ? description : ' ',
        author: req.user.username,
        status,
      };

      await this.createFolderService.execute(folder, transaction);
    });

    res.status(201).send();
  }
}
