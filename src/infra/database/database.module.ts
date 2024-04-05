import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { UserRepository } from './repositories/UserRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [PrismaService, UserRepository],
})
export class DatabaseModule {}
