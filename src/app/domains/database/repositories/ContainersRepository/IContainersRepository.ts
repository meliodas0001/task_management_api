import { ORMTransactionInstance } from '@domains/database/ORM';
import {
  ContainersEntity,
  ContainersFindById,
} from '@domains/database/entities/Containers/ContainersEntity';
import { IContainerCreate } from '@domains/requests/container/container';
import { Roles } from '@prisma/client';

export abstract class IContainersRepository {
  public abstract createContainer(
    container: IContainerCreate,
    userId: string,
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

  public abstract findById(
    id: string,
    transaction: ORMTransactionInstance,
  ): Promise<ContainersFindById>;

  public abstract updateUserRole(
    containerId: string,
    userId: string,
    userRole: Roles,
    transaction: ORMTransactionInstance,
  ): Promise<void>;
}
