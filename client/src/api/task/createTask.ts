import { AxiosResponse } from 'axios';

import { Task } from '@/models/Task';
import { apiClient } from '@/utils/apiClient';

export type CreateTaskBody = {
  title: string;
};

export type CreateTaskResponse = AxiosResponse<Task>;

export function createTaskRequest(body: CreateTaskBody): Promise<CreateTaskResponse> {
  return apiClient.post(`/tasks`, body);
}
