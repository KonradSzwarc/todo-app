import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async findByIdOrFail(userId: string, taskId: string) {
    const taskRecord = await this.findOne({ id: taskId, userId });

    if (!taskRecord) {
      throw new NotFoundException();
    }

    return taskRecord;
  }
}
