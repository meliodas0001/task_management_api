import { DatabaseModule } from '@infra/database/database.module';
import { PrismaService } from '@infra/database/prisma.service';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TaskCreateService } from '@app/useCases/tasks/taskCreate.service';

@Module({
  controllers: [TasksController],
  providers: [PrismaService, TaskCreateService],
  imports: [DatabaseModule],
})
export class TasksModule {}
