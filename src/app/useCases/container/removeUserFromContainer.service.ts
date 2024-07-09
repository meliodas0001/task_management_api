import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IContainersRepository } from '@domains/database/repositories/ContainersRepository/IContainersRepository';
import { ORMTransactionInstance } from '@domains/database/ORM';
import { IUserRepository } from '@domains/database/repositories/UserRepository/IUserRepository';

@Injectable()
export class RemoveUserFromContainerService {
  constructor(
    private readonly containersRepository: IContainersRepository,
    private readonly usersRepository: IUserRepository,
  ) {}

  async execute(
    userId: string,
    containerId: string,
    transaction: ORMTransactionInstance,
  ) {
    const getUsersFromContainer =
      await this.containersRepository.getContainerUsers(
        containerId,
        transaction,
      );

    if (getUsersFromContainer.ownerId === userId) {
      throw new UnauthorizedException('Cannot remove owner from container');
    }

    if (!getUsersFromContainer.users.some((user) => user.id === userId)) {
      throw new UnauthorizedException('User not found in the container');
    }

    await this.usersRepository.removeUserFromContainer(
      userId,
      containerId,
      transaction,
    );
  }
}
