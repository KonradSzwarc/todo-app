import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) return null;

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) return null;

    return user;
  }

  signIn(user: User) {
    const payload = { sub: user.id };

    return this.jwtService.sign(payload);
  }
}
