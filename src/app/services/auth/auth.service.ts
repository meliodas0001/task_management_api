import { ORMTransactionInstance } from '@domains/database/ORM';
import { IUserRepository } from '@domains/database/repositories/UserRepository/IUserRepository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  async login(userLogin: ILogin, transaction: ORMTransactionInstance) {
    const { email, password } = userLogin;

    const findUser = await this.userRepository.findByEmail(email, transaction);

    const { username, id } = findUser;

    if (!findUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    bcrypt.compare(password, findUser.password, (err, isMatch: boolean) => {
      if (err || !isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return { email, id, username };
    });
  }
}
