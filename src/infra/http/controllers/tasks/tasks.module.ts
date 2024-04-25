import { DatabaseModule } from '@infra/database/database.module';
import { PrismaService } from '@infra/database/prisma.service';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TaskCreateService } from '@app/useCases/tasks/taskCreate.service';
import { TaskDeleteService } from '@app/useCases/tasks/taskDelete.service';
import { TaskFindManyService } from '@app/useCases/tasks/taskFindMany.service';
import { TaskUpdateService } from '@app/useCases/tasks/taskUpdate.service';

@Module({
  controllers: [TasksController],
  providers: [
    PrismaService,
    TaskCreateService,
    TaskDeleteService,
    TaskFindManyService,
    TaskUpdateService,
  ],
  imports: [DatabaseModule],
})
export class TasksModule {}
