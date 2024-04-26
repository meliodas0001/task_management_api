import { IContainersRepository } from '@domains/database/repositories/ContainersRepository/IContainersRepository';
import { PrismaService } from '@infra/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class RolesPermissionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly containersRepository: IContainersRepository,
  ) {}

  async verifyUserPermission(
    userId: string,
    containerId: string,
  ): Promise<any> {
    let roles;

    await this.prismaService.$transaction(async (transaction) => {
      const container = await this.containersRepository.getAllContainers(
        userId,
        transaction,
      );

      if (!container) {
        throw new NotFoundException('Container not found');
      }

      container.forEach((RoleContainer) => {
        if (RoleContainer.id === containerId) {
          roles = RoleContainer.roles;
        }
      });
    });

    return roles;
  }
}
