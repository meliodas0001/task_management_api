import { UserEntity } from '@entities/User/UserEntity';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { ORMTransactionInstance } from 'src/app/domains/database/ORM';

export class UserRepository implements IUserRepository {
  public async createUser(
    user: UserEntity,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    const { id, email, password, username } = user;

    return await transaction.user.create({
      data: {
        id,
        email,
        password,
        username,
      },
    });
  }

  public async findByEmail(
    email: string,
    transaction: ORMTransactionInstance,
  ): Promise<UserEntity> {
    return transaction.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async findById(
    id: string,
    transaction: ORMTransactionInstance,
  ): Promise<UserEntity> {
    return transaction.user.findUnique({
      where: {
        id,
      },
    });
  }
}
