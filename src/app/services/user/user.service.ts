import * as bcrypt from 'bcrypt';
import { ORMTransactionInstance } from '@domains/database/ORM';
import { IUserRepository } from '@domains/database/repositories/UserRepository/IUserRepository';
import { IUserCreate } from '@domains/requests/users/users';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async createUser(
    user: IUserCreate,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    const findUser = await this.userRepository.findByEmail(
      user.email,
      transaction,
    );

    if (findUser) {
      throw new ConflictException('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = hashedPassword;

    await this.userRepository.createUser(user, transaction);
  }
}
