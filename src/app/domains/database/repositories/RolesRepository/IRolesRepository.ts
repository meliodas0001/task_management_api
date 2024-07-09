import { IRolesEntity } from '@domains/database/entities/Roles/IRolesEntitiy';

import { ORMTransactionInstance } from '@domains/database/ORM';

export abstract class IRolesRepository {
  abstract findRole(
    userId: string,
    containerId: string,
    transaction: ORMTransactionInstance,
  ): Promise<IRolesEntity[]>;

  public abstract deleteUserRole(
    roleId: string,
    transaction: ORMTransactionInstance,
  ): Promise<void>;
}
