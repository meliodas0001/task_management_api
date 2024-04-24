import { Module } from '@nestjs/common';
import { FoldersController } from './folders.controller';
import { DatabaseModule } from '@infra/database/database.module';
import { PrismaService } from '@infra/database/prisma.service';
import { CreateFolderService } from '@app/useCases/folders/createFolder.service';

@Module({
  controllers: [FoldersController],
  providers: [PrismaService, CreateFolderService],
  imports: [DatabaseModule],
})
export class FoldersModule {}
