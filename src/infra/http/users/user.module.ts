import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '@domains/services/user/user.service';
import { PrismaService } from 'src/infra/database/prisma.service';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  imports: [DatabaseModule],
})
export class UserModule {}
