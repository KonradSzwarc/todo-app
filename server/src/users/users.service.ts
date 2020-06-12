import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findOne(userId: string) {
    return this.userRepository.findById(userId);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  findOneOrFail(userId: string) {
    return this.userRepository.findByIdOrFail(userId);
  }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateOrFail(userId, updateUserDto);
  }

  async delete(userId: string) {
    await this.userRepository.deleteOrFail(userId);

    return true;
  }
}
