import { ORMTransactionInstance } from '@domains/database/ORM';
import { ContainersEntity } from '@domains/database/entities/Containers/ContainersEntity';

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
}
