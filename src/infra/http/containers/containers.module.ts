import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { ContainerController } from './containers.controller';
import { PrismaService } from '@infra/database/prisma.service';
import { ContainersService } from '@app/services/containers/containers.service';

@Module({
  controllers: [ContainerController],
  providers: [ContainersService, PrismaService],
  imports: [DatabaseModule],
})
export class ContainersModule {}
