import { Injectable } from '@nestjs/common';

import { ORMTransactionInstance } from '@domains/database/ORM';
import { IContainersRepository } from '@domains/database/repositories/ContainersRepository/IContainersRepository';
import { IContainerCreate } from '@domains/requests/container/container';

@Injectable()
export class CreateContainerService {
  constructor(private readonly containersRepository: IContainersRepository) {}

  execute(
    container: IContainerCreate,
    userId: string,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    return this.containersRepository.createContainer(
      container,
      userId,
      transaction,
    );
  }
}
