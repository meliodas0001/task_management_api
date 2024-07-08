import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IContainersRepository } from '@domains/database/repositories/ContainersRepository/IContainersRepository';
import { ORMTransactionInstance } from '@domains/database/ORM';
import { Roles } from '@prisma/client';

@Injectable()
export class UpdateUserRolesService {
  constructor(private readonly containersRepository: IContainersRepository) {}

  async execute(
    containerId: string,
    userId: string,
    userRole: string,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    console.log(containerId);

    const container = await this.containersRepository.findById(
      containerId,
      transaction,
    );

    console.log(container);

    if (!container) throw new UnauthorizedException('Container not found');

    let userFind = false;

    container.users.forEach((user) => {
      if (user.id === userId) {
        userFind = true;
      }
    });

    if (!userFind)
      throw new UnauthorizedException('User not found in container');

    return await this.containersRepository.updateUserRole(
      userId,
      Roles[userRole],
      transaction,
    );
  }
}
