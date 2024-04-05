import { ORMTransactionInstance } from '@domains/database/ORM';
import { UserEntity } from '@domains/database/entities/User/UserEntity';
import { IUserRepository } from '@domains/database/repositories/UserRepository/IUserRepository';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async createUser(user, transaction: ORMTransactionInstance): Promise<void> {
    const findUser = await this.userRepository.findByEmail(
      user.email,
      transaction,
    );

    if (findUser) {
      throw new ConflictException('User already exists');
    }

    await this.userRepository.createUser(user, transaction);
  }
}
