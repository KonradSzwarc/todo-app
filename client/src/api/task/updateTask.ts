import { AxiosResponse } from 'axios';

import { Task } from '@/models/Task';
import { apiClient } from '@/utils/apiClient';

export type UpdateTaskParams = {
  id: string;
};

export type UpdateTaskBody = {
  isDone?: boolean;
  title?: string;
};

export type UpdateTaskResponse = AxiosResponse<Task>;

export function updateTaskRequest(params: UpdateTaskParams, body: UpdateTaskBody): Promise<UpdateTaskResponse> {
  return apiClient.patch(`/tasks/${params.id}`, body);
}
