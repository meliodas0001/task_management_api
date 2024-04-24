import { CreateFolderService } from '@app/useCases/folders/createFolder.service';
import { PrismaService } from '@infra/database/prisma.service';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('containers/folders')
export class FoldersController {
  constructor(
    private prismaService: PrismaService,
    private readonly createFolderService: CreateFolderService,
  ) {}

  @Post('create')
  async createFolder(@Body() body: any, @Req() req: Request) {
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
  }
}
