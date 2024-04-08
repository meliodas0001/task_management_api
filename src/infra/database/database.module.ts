import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IUserRepository } from '@domains/database/repositories/UserRepository/IUserRepository';
import { UserRepository } from './repositories/UserRepository';
import { IContainersRepository } from '@domains/database/repositories/ContainersRepository/IContainersRepository';
import { ContainersRepository } from './repositories/ContainersRepository';

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
  ],
  exports: [PrismaService, IUserRepository, IContainersRepository],
})
export class DatabaseModule {}
