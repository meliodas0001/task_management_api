import { ContainersEntity } from '@domains/database/entities/Containers/ContainersEntity';
import { IContainersRepository } from '@domains/database/repositories/ContainersRepository/IContainersRepository';
import { Injectable } from '@nestjs/common';
import { ORMTransactionInstance } from '@domains/database/ORM';

@Injectable()
export class ContainersService {
  constructor(private readonly containersRepository: IContainersRepository) {}

  create(
    container: ContainersEntity,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    return this.containersRepository.createContainer(container, transaction);
  }
}
