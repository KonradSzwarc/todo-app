import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { User } from '../users/user.entity';
import { UserRepository } from 'src/users/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

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
