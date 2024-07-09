import { UserEntity } from '@domains/database/entities/User/UserEntity';
import { IUserRepository } from '@domains/database/repositories/UserRepository/IUserRepository';
import { ORMTransactionInstance } from 'src/app/domains/database/ORM';

export class UserRepository implements IUserRepository {
  public async createUser(
    user: UserEntity,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    const { email, password, username } = user;

    await transaction.user.create({
      data: {
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

  public async removeUserFromContainer(
    userId: string,
    containerId: string,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    await transaction.user.update({
      where: {
        id: userId,
      },
      data: {
        containers: {
          disconnect: {
            id: containerId,
          },
        },
      },
    });
  }
}
