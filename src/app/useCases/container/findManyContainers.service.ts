import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ORMTransactionInstance } from '@domains/database/ORM';
import { IContainersRepository } from '@domains/database/repositories/ContainersRepository/IContainersRepository';
import { IUserRepository } from '@domains/database/repositories/UserRepository/IUserRepository';

@Injectable()
export class FindManyContainers {
  constructor(
    private readonly containersRepository: IContainersRepository,
    private readonly usersRepository: IUserRepository,
  ) {}

  async execute(
    userId: string,
    transaction: ORMTransactionInstance,
  ): Promise<any> {
    const user = await this.usersRepository.findById(userId, transaction);

    if (!user) throw new UnauthorizedException('User not found');

    return this.containersRepository.getAllContainers(userId, transaction);
  }
}
