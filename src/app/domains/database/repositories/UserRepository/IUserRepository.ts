import { UserEntity } from '@entities/User/UserEntity';
import { ORMTransactionInstance } from '../../ORM';

export abstract class IUserRepository {
  public abstract createUser(
    user: UserEntity,
    transaction: ORMTransactionInstance,
  ): Promise<void>;

  public abstract findById(
    id: string,
    transaction: ORMTransactionInstance,
  ): Promise<UserEntity>;

  public abstract findByEmail(
    email: string,
    transaction: ORMTransactionInstance,
  ): Promise<UserEntity>;
}
