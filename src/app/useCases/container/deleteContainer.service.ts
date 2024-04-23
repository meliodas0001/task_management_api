import { Injectable, UnauthorizedException } from '@nestjs/common';

import { IContainersRepository } from '@domains/database/repositories/ContainersRepository/IContainersRepository';
import { ORMTransactionInstance } from '@domains/database/ORM';

@Injectable()
export class DeleteContainerService {
  constructor(private readonly containersRepository: IContainersRepository) {}

  async execute(
    containerId: string,
    userId: string,
    transaction: ORMTransactionInstance,
  ) {
    const container = await this.containersRepository.findById(
      containerId,
      transaction,
    );

    if (!container) {
      throw new UnauthorizedException('Container not found');
    }

    if (container.ownerId !== userId) {
      throw new UnauthorizedException('User not owner of container');
    }

    return await this.containersRepository.deleteContainer(
      containerId,
      transaction,
    );
  }
}
