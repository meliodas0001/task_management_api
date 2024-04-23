import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ORMTransactionInstance } from '@domains/database/ORM';
import { IContainersRepository } from '@domains/database/repositories/ContainersRepository/IContainersRepository';

@Injectable()
export class GetContainerByIdService {
  constructor(private readonly containerRepository: IContainersRepository) {}

  async execute(
    containerId: string,
    userId: string,
    transaction: ORMTransactionInstance,
  ) {
    const container = await this.containerRepository.findById(
      containerId,
      transaction,
    );

    if (!container) throw new UnauthorizedException('Container not found');

    if (!container.public) {
      let userFind = false;

      container.users.forEach((user) => {
        if (user.id === userId) {
        }
        userFind = true;
      });

      if (!userFind)
        throw new UnauthorizedException('User not found in container');
    }

    return container;
  }
}
