import { Injectable } from '@nestjs/common';
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
    return this.taskRepository.updateOrFail(userId, taskId, updateTaskDto);
  }

  async delete(userId: string, taskId: string) {
    await this.taskRepository.deleteOrFail(userId, taskId);

    return true;
  }
}
