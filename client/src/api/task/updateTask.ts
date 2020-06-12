import { AxiosResponse } from 'axios';

import { Task } from '@/models/Task';
import { TaskStatus } from '@/models/TaskStatus';
import { apiClient } from '@/utils/apiClient';

export type UpdateTaskParams = {
  id: string;
};

export type UpdateTaskBody = {
  status?: TaskStatus;
  content?: string;
};

export type UpdateTaskResponse = AxiosResponse<Task>;

export function updateTaskRequest(params: UpdateTaskParams, body: UpdateTaskBody): Promise<UpdateTaskResponse> {
  return apiClient.put(`/tasks/${params.id}`, body);
}
