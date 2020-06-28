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

  async updateOrFail(userId: string, taskId: string, task: Partial<Task>) {
    const taskRecord = await this.findByIdOrFail(userId, taskId);

    return this.save({
      ...taskRecord,
      ...task,
    });
  }

  async deleteOrFail(userId: string, taskId: string) {
    const result = await this.delete({ id: taskId, userId });

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    return result;
  }
}
