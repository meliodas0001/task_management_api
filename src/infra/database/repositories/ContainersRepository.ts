import {
  ContainersEntity,
  ContainersFindById,
} from '@domains/database/entities/Containers/ContainersEntity';
import { ORMTransactionInstance } from '@domains/database/ORM';
import { IContainersRepository } from '@domains/database/repositories/ContainersRepository/IContainersRepository';
import { IContainerCreate } from '@domains/requests/container/container';
import { Roles } from '@prisma/client';

export class ContainersRepository extends IContainersRepository {
  public async createContainer(
    container: IContainerCreate,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    const { description, name, ownerId } = container;

    const newContainer = await transaction.container.create({
      data: {
        description,
        name,
        ownerId,
        roles: {
          create: [{ name: Roles.Admin, userId: ownerId }],
        },
      },
    });

    await transaction.user.update({
      where: { id: ownerId },
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
  ): Promise<ContainersEntity[]> {
    const { containers } = await transaction.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        containers: true,
      },
    });

    return containers;
  }

  public async deleteContainer(
    containerId: string,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
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
    const { id, description, name, ownerId } = container;

    transaction.container.update({
      where: {
        id,
      },
      data: {
        description,
        name,
        ownerId,
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
        users: true,
      },
    });

    return container;
  }
}
