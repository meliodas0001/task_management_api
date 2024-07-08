import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IContainersRepository } from '@domains/database/repositories/ContainersRepository/IContainersRepository';
import { IUpdateContainerSchema } from '@domains/requests/container/updateContainer';
import { ORMTransactionInstance } from '@domains/database/ORM';

@Injectable()
export class UpdateContainerService {
  constructor(private readonly containersRepository: IContainersRepository) {}

  async execute(
    data: IUpdateContainerSchema,
    transaction: ORMTransactionInstance,
  ) {
    const findContainer = await this.containersRepository.findById(
      data.containerId,
      transaction,
    );

    if (!findContainer) throw new UnauthorizedException('Container not found');

    const updContainer = {
      ...findContainer,
      ...data,
    };

    await this.containersRepository.updateContainer(updContainer, transaction);
  }
}
