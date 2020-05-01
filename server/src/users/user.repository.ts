import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByEmail(email: string) {
    return this.findOne({ email });
  }

  findById(id: string) {
    return this.findOne({ id });
  }

  async findByIdOrFail(id: string) {
    const userRecord = await this.findOne({ id });

    if (!userRecord) {
      throw new NotFoundException();
    }

    return userRecord;
  }

  async updateOrFail(id: string, user: Partial<User>) {
    const userRecord = await this.findById(id);

    return this.save({
      ...userRecord,
      ...user,
    });
  }

  async deleteOrFail(id: string) {
    const result = await this.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    return result;
  }
}
