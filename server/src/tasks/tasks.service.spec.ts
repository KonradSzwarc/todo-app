import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

const correctUserId = '1';
const incorrectUserId = '2';
const correctTaskId = '1';
const incorrectTaskId = '2';

const mockTask: Omit<Task, 'user'> = {
  id: correctTaskId,
  title: 'Some task',
  isDone: false,
  userId: correctUserId,
};

const mockCreateTaskDto = {
  title: 'Lorem ipsum',
};

const mockUpdateTaskDto = {
  title: 'New lorem ipsum',
};

const mockTaskRepository = () => ({
  find: jest.fn().mockReturnValue([]),
  findOne: jest.fn(({ id, userId }) => {
    if (id === correctTaskId && userId === correctUserId) return Promise.resolve(mockTask);
    return Promise.resolve();
  }),
  save: jest.fn((data: Partial<typeof mockTask>) => {
    return { ...mockTask, ...data };
  }),
  delete: jest.fn(({ id, userId }) => {
    if (id === correctTaskId && userId === correctUserId) return Promise.resolve({ affected: 1 });
    return Promise.resolve({ affected: 0 });
  }),
});

describe('TasksService', () => {
  let tasksService: TasksService;
  let taskRepository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, { provide: TaskRepository, useFactory: mockTaskRepository }],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  describe('findAll', () => {
    it('calls taskRepository.find() and returns the result', async () => {
      const result = await tasksService.findAll(correctUserId);

      expect(taskRepository.find).toHaveBeenCalledWith({ where: { userId: correctUserId } });
      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('calls taskRepository.save() and returns the result', async () => {
      const result = await tasksService.create(correctUserId, mockCreateTaskDto);

      expect(taskRepository.save).toHaveBeenCalledWith({ ...mockCreateTaskDto, userId: correctUserId });
      expect(result).toEqual({ ...mockTask, ...mockCreateTaskDto });
    });
  });

  describe('update', () => {
    it('calls taskRepository.save() and returns the result', async () => {
      const result = await tasksService.update(correctUserId, correctTaskId, mockUpdateTaskDto);

      expect(taskRepository.save).toHaveBeenCalledWith({ ...mockTask, ...mockUpdateTaskDto });
      expect(result).toEqual({ ...mockTask, ...mockUpdateTaskDto });
    });

    it('throws an error as task could not be found', async () => {
      await expect(tasksService.update(correctUserId, incorrectTaskId, mockUpdateTaskDto)).rejects.toThrowError(
        new NotFoundException(),
      );
      await expect(tasksService.update(incorrectUserId, correctTaskId, mockUpdateTaskDto)).rejects.toThrowError(
        new NotFoundException(),
      );
    });
  });

  describe('delete', () => {
    it('calls taskRepository.delete() and successfully removes the task', async () => {
      const result = await tasksService.delete(correctUserId, correctTaskId);

      expect(taskRepository.delete).toHaveBeenCalledWith({ id: correctTaskId, userId: correctUserId });
      expect(result).toEqual(true);
    });

    it('throws an error as task could not be found', async () => {
      await expect(tasksService.delete(correctUserId, incorrectTaskId)).rejects.toThrowError(new NotFoundException());
      await expect(tasksService.delete(incorrectUserId, correctTaskId)).rejects.toThrowError(new NotFoundException());
    });
  });
});
