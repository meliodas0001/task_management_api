import { Module } from '@nestjs/common';
import { FoldersController } from './folders.controller';
import { DatabaseModule } from '@infra/database/database.module';
import { PrismaService } from '@infra/database/prisma.service';
import { CreateFolderService } from '@app/useCases/folders/createFolder.service';
import { DeleteFolderService } from '@app/useCases/folders/deleteFolder.service';
import { FindManyFoldersService } from '@app/useCases/folders/findManyFolders.service';

@Module({
  controllers: [FoldersController],
  providers: [
    PrismaService,
    CreateFolderService,
    DeleteFolderService,
    FindManyFoldersService,
  ],
  imports: [DatabaseModule],
})
export class FoldersModule {}
