import { ContainersEntity } from '@domains/database/entities/Containers/ContainersEntity';
import { ORMTransactionInstance } from '@domains/database/ORM';
import { IContainersRepository } from '@domains/database/repositories/ContainersRepository/IContainersRepository';

export class ContainersRepository extends IContainersRepository {
  public async createContainer(
    container: ContainersEntity,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    const { description, name, ownerId } = container;

    await transaction.container.create({
      data: {
        description,
        name,
        ownerId,
      },
    });
  }

  public async getAllContainers(
    userId: string,
    transaction: ORMTransactionInstance,
  ): Promise<ContainersEntity[]> {
    return await transaction.container.findMany({
      where: {
        ownerId: userId,
      },
    });
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
}
