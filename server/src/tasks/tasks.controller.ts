import { Controller, Body, Param, Get, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../common/decorators/user.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { Task } from './task.entity';

@UseGuards(AuthGuard)
@ApiSecurity('cookie')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAllTasks(@User('id') userId: string): Promise<Task[]> {
    return this.tasksService.findAll(userId);
  }

  @Post()
  createTask(@User('id') userId: string, @Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(userId, createTaskDto);
  }

  @Put(':id')
  updateTask(
    @User('id') userId: string,
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(userId, taskId, updateTaskDto);
  }

  @Delete(':id')
  deleteTask(@User('id') userId: string, @Param('id') taskId: string): Promise<boolean> {
    return this.tasksService.delete(userId, taskId);
  }
}
