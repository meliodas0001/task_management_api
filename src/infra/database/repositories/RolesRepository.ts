import { IRolesEntity } from '@domains/database/entities/Roles/IRolesEntitiy';
import { ORMTransactionInstance } from '@domains/database/ORM';
import { IRolesRepository } from '@domains/database/repositories/RolesRepository/IRolesRepository';

export class RolesRepository implements IRolesRepository {
  async findRole(
    userId: string,
    containerId: string,
    transaction: ORMTransactionInstance,
  ): Promise<IRolesEntity[]> {
    return await transaction.role.findMany({
      where: {
        userId,
        containerId,
      },
    });
  }

  public async deleteUserRole(
    roleId: string,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    await transaction.role.delete({
      where: {
        id: roleId,
      },
    });
  }
}
