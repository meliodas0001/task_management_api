import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IUserRepository } from '@domains/database/repositories/UserRepository/IUserRepository';
import { UserRepository } from './repositories/UserRepository';
import { IContainersRepository } from '@domains/database/repositories/ContainersRepository/IContainersRepository';
import { ContainersRepository } from './repositories/ContainersRepository';
import { IFoldersRepository } from '@domains/database/repositories/FoldersRepository/IFoldersRepository';
import { FoldersRepository } from './repositories/FoldersRepository';
import { ITasksRepository } from '@domains/database/repositories/TasksRepository/ITasksRepository';
import { TasksRepository } from './repositories/TasksRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IContainersRepository,
      useClass: ContainersRepository,
    },
    {
      provide: IFoldersRepository,
      useClass: FoldersRepository,
    },
    {
      provide: ITasksRepository,
      useClass: TasksRepository,
    },
  ],
  exports: [
    PrismaService,
    IUserRepository,
    IContainersRepository,
    IFoldersRepository,
    ITasksRepository,
  ],
})
export class DatabaseModule {}
