import { Injectable, UnauthorizedException } from '@nestjs/common';

import { IContainersRepository } from '@domains/database/repositories/ContainersRepository/IContainersRepository';
import { IUserRepository } from '@domains/database/repositories/UserRepository/IUserRepository';
import { ORMTransactionInstance } from '@domains/database/ORM';
import { Roles } from '@prisma/client';

@Injectable()
export class AddUserToContainer {
  constructor(
    private readonly containersRepository: IContainersRepository,
    private readonly usersRepository: IUserRepository,
  ) {}

  async execute(
    userId: string,
    containerId: string,
    transaction: ORMTransactionInstance,
    userRoles?: Roles,
  ): Promise<void> {
    const user = await this.usersRepository.findById(userId, transaction);

    if (!user) {
      throw new UnauthorizedException('User Id not found');
    }

    const container = await this.containersRepository.findById(
      containerId,
      transaction,
    );

    if (!container) {
      throw new UnauthorizedException('Container id not found');
    }

    container.users.forEach((x) => {
      if (x.id === userId) {
        throw new UnauthorizedException('User already in container');
      }
    });

    return await this.containersRepository.addUserToContainer(
      userId,
      containerId,
      transaction,
      Roles[userRoles ? userRoles : Roles.User],
    );
  }
}
