import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.userRepository.findOne(userId);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const userRecord = await this.userRepository.findByIdOrFail(userId);

    return this.userRepository.save({
      ...userRecord,
      ...updateUserDto,
    });
  }

  async delete(userId: string) {
    const result = await this.userRepository.delete(userId);

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    return true;
  }
}
