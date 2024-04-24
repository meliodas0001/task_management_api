import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request, Response } from 'express';

import { CreateFolderService } from '@app/useCases/folders/createFolder.service';

import { FoldersCreateSchema } from '@app/utils/validators/schemas/Folders/folders';
import { ValidatorPipe } from '@app/utils/validators/pipes/validatorPipes';

import { PrismaService } from '@infra/database/prisma.service';

@Controller('containers/folders')
export class FoldersController {
  constructor(
    private prismaService: PrismaService,
    private readonly createFolderService: CreateFolderService,
  ) {}

  @Post('create')
  async createFolder(
    @Body(new ValidatorPipe(FoldersCreateSchema)) body: any,
    @Req() req: Request,
    res: Response,
  ) {
    await this.prismaService.$transaction(async (transaction) => {
      const { name, description, containerId } = body;

      const folder = {
        name,
        containerId,
        description: description ? description : ' ',
        author: req.user.id,
      };

      await this.createFolderService.execute(folder, transaction);
    });

    res.status(201).send();
  }
}
