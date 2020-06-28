import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {}

  findAll(userId: string) {
    return this.taskRepository.find({ where: { userId } });
  }

  create(userId: string, createTaskDto: CreateTaskDto) {
    return this.taskRepository.save({
      ...createTaskDto,
      userId,
    });
  }

  async update(userId: string, taskId: string, updateTaskDto: UpdateTaskDto) {
    const taskRecord = await this.taskRepository.findByIdOrFail(userId, taskId);

    return this.taskRepository.save({
      ...taskRecord,
      ...updateTaskDto,
    });
  }

  async delete(userId: string, taskId: string) {
    const result = await this.taskRepository.delete({ id: taskId, userId });

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    return true;
  }
}
