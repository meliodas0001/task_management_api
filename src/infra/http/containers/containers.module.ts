import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { ContainerController } from './containers.controller';
import { PrismaService } from '@infra/database/prisma.service';
import { ContainersService } from '@app/services/containers/containers.service';
import { AddUserToContainerService } from '@app/useCases/container/addUserToContainer.service';
import { CreateContainerService } from '@app/useCases/container/createContainer.service';
import { DeleteContainerService } from '@app/useCases/container/deleteContainer.service';
import { FindManyContainersService } from '@app/useCases/container/findManyContainers.service';
import { GetContainerByIdService } from '@app/useCases/container/getContainerById.service';
import { UpdateUserRolesService } from '@app/useCases/container/updateUserRole.service';

@Module({
  controllers: [ContainerController],
  providers: [
    AddUserToContainerService,
    CreateContainerService,
    DeleteContainerService,
    FindManyContainersService,
    GetContainerByIdService,
    UpdateUserRolesService,
    PrismaService,
  ],
  imports: [DatabaseModule],
})
export class ContainersModule {}
