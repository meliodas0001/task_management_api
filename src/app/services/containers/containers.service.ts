import { ContainersEntity } from '@domains/database/entities/Containers/ContainersEntity';
import { IContainersRepository } from '@domains/database/repositories/ContainersRepository/IContainersRepository';
import { Injectable } from '@nestjs/common';
import { ORMTransactionInstance } from '@domains/database/ORM';
import { Roles } from '@prisma/client';

@Injectable()
export class ContainersService {
  constructor(private readonly containersRepository: IContainersRepository) {}

  create(
    container: ContainersEntity,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    return this.containersRepository.createContainer(container, transaction);
  }

  findMany(userId: string, transaction: ORMTransactionInstance): Promise<any> {
    return this.containersRepository.getAllContainers(userId, transaction);
  }

  addUserToContainer(
    userId: string,
    containerId: string,
    transaction: ORMTransactionInstance,
    userRoles?: Roles,
  ): Promise<void> {
    return this.containersRepository.addUserToContainer(
      userId,
      containerId,
      transaction,
      userRoles,
    );
  }
}
