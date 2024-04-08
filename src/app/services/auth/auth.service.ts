import { ORMTransactionInstance } from '@domains/database/ORM';
import { IUserRepository } from '@domains/database/repositories/UserRepository/IUserRepository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private jwtService: JwtService,
  ) {}

  async login(userLogin: ILogin, transaction: ORMTransactionInstance) {
    const { email, password } = userLogin;

    const findUser = await this.userRepository.findByEmail(email, transaction);

    const { username, id, roles } = findUser;

    if (!findUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    bcrypt.compare(password, findUser.password, (err, isMatch: boolean) => {
      if (err || !isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { email, username, roles, id };

      return {
        access_token: this.jwtService.signAsync(payload),
      };
    });
  }
}
