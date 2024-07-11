import {
  ContainersEntity,
  ContainersFindById,
} from '@domains/database/entities/Containers/ContainersEntity';
import { UserDTO } from '@domains/database/entities/User/UserEntity';
import { ORMTransactionInstance } from '@domains/database/ORM';
import { IContainersRepository } from '@domains/database/repositories/ContainersRepository/IContainersRepository';
import { IContainerCreate } from '@domains/requests/container/container';
import {
  IFindAllUserContainers,
  IGetAllContainers,
} from '@domains/requests/container/getAllContainers';
import { IRemoveUserFromContainer } from '@domains/requests/container/removeUserFromContainer';
import { Roles } from '@prisma/client';

export class ContainersRepository extends IContainersRepository {
  public async createContainer(
    container: IContainerCreate,
    userId: string,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    const { description, name } = container;

    const newContainer = await transaction.container.create({
      data: {
        description,
        name,
        ownerId: userId,
        roles: {
          create: [{ name: Roles.Admin, userId: userId }],
        },
      },
    });

    await transaction.user.update({
      where: { id: userId },
      data: {
        containers: {
          connect: {
            id: newContainer.id,
          },
        },
      },
    });
  }

  public async getAllContainers(
    userId: string,
    transaction: ORMTransactionInstance,
  ): Promise<IGetAllContainers[]> {
    const containers = await transaction.container.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        users: false,
        roles: true,
      },
    });

    return containers;
  }

  public async deleteContainer(
    containerId: string,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    await transaction.role.deleteMany({
      where: {
        containerId,
      },
    });

    await transaction.container.delete({
      where: {
        id: containerId,
      },
    });
  }

  public async updateContainer(
    container: ContainersEntity,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    const { id, description, name, ownerId, isPublic } = container;

    await transaction.container.update({
      where: {
        id,
      },
      data: {
        description,
        name,
        ownerId,
        isPublic,
      },
    });
  }

  public async addUserToContainer(
    userId: string,
    containerId: string,
    transaction: ORMTransactionInstance,
    userRole: Roles,
  ) {
    await transaction.user.update({
      where: {
        id: userId,
      },
      data: {
        containers: {
          connect: {
            id: containerId,
          },
        },
      },
    });

    await transaction.role.create({
      data: {
        name: userRole,
        containerId,
        userId,
      },
    });
  }

  public async findById(
    id: string,
    transaction: ORMTransactionInstance,
  ): Promise<ContainersFindById> {
    const container = await transaction.container.findFirst({
      where: {
        id,
      },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return container;
  }

  public async updateUserRole(
    id: string,
    userRole: Roles,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    await transaction.role.update({
      where: {
        id,
      },
      data: {
        name: userRole,
      },
    });
  }

  public async getContainerUsers(
    containerId: string,
    transaction: ORMTransactionInstance,
  ): Promise<IRemoveUserFromContainer> {
    const users = await transaction.container.findFirst({
      where: {
        id: containerId,
      },
      select: {
        ownerId: true,
        users: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return users;
  }

  async findAllUserContainers(
    userId: string,
    transaction: ORMTransactionInstance,
  ): Promise<IFindAllUserContainers[]> {
    const containers = await transaction.container.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        users: false,
        roles: false,
      },
    });

    return containers;
  }
}
