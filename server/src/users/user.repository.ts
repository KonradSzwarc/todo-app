import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByIdOrFail(id: string) {
    const userRecord = await this.findOne(id);

    if (!userRecord) {
      throw new NotFoundException();
    }

    return userRecord;
  }
}
