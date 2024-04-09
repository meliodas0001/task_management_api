import { ORMTransactionInstance } from '@domains/database/ORM';
import { ContainersEntity } from '@domains/database/entities/Containers/ContainersEntity';
import { Roles } from '@prisma/client';

export abstract class IContainersRepository {
  public abstract createContainer(
    container: ContainersEntity,
    transaction: ORMTransactionInstance,
  ): Promise<void>;

  public abstract getAllContainers(
    userId: string,
    transaction: ORMTransactionInstance,
  ): Promise<ContainersEntity[]>;

  public abstract deleteContainer(
    containerId: string,
    transaction: ORMTransactionInstance,
  ): Promise<void>;

  public abstract updateContainer(
    container: ContainersEntity,
    transaction: ORMTransactionInstance,
  ): Promise<void>;

  public abstract addUserToContainer(
    userId: string,
    containerId: string,
    transaction: ORMTransactionInstance,
    userRole?: Roles,
  ): Promise<void>;
}
