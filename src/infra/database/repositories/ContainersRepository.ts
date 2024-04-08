import { ContainersEntity } from '@domains/database/entities/Containers/ContainersEntity';
import { ORMTransactionInstance } from '@domains/database/ORM';
import { IContainersRepository } from '@domains/database/repositories/ContainersRepository/IContainersRepository';

export class ContainersRepository extends IContainersRepository {
  public createContainer(
    container: ContainersEntity,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public getAllContainers(
    userId: string,
    transaction: ORMTransactionInstance,
  ): Promise<ContainersEntity[]> {
    throw new Error('Method not implemented.');
  }
  public deleteContainer(
    containerId: string,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public updateContainer(
    container: ContainersEntity,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
