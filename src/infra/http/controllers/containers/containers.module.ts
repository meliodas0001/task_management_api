import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { ContainerController } from './containers.controller';
import { PrismaService } from '@infra/database/prisma.service';

import { AddUserToContainerService } from '@app/useCases/container/addUserToContainer.service';
import { CreateContainerService } from '@app/useCases/container/createContainer.service';
import { DeleteContainerService } from '@app/useCases/container/deleteContainer.service';
import { FindManyContainersService } from '@app/useCases/container/findManyContainers.service';
import { GetContainerByIdService } from '@app/useCases/container/getContainerById.service';
import { UpdateUserRolesService } from '@app/useCases/container/updateUserRole.service';
import { RolesPermissionService } from '@app/services/roles/rolesPermission.service';
import { UpdateContainerService } from '@app/useCases/container/updateContainer.service';
import { RemoveUserFromContainerService } from '@app/useCases/container/removeUserFromContainer.service';

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
    RolesPermissionService,
    UpdateContainerService,
    RemoveUserFromContainerService,
  ],
  imports: [DatabaseModule],
})
export class ContainersModule {}
