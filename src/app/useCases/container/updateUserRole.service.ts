import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IContainersRepository } from '@domains/database/repositories/ContainersRepository/IContainersRepository';
import { ORMTransactionInstance } from '@domains/database/ORM';
import { Roles } from '@prisma/client';
import { IRolesRepository } from '@domains/database/repositories/RolesRepository/IRolesRepository';

@Injectable()
export class UpdateUserRolesService {
  constructor(
    private readonly containersRepository: IContainersRepository,
    private readonly rolesRepository: IRolesRepository,
  ) {}

  async execute(
    containerId: string,
    userId: string,
    userRole: string,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    const container = await this.containersRepository.findById(
      containerId,
      transaction,
    );

    if (!container) throw new UnauthorizedException('Container not found');

    const role = await this.rolesRepository.findRole(
      userId,
      containerId,
      transaction,
    );

    if (!role) throw new UnauthorizedException('User not found in container');

    return await this.containersRepository.updateUserRole(
      role[0].id,
      Roles[userRole],
      transaction,
    );
  }
}
