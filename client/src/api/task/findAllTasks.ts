import { AxiosResponse } from 'axios';

import { Task } from '@/models/Task';
import { apiClient } from '@/utils/apiClient';

export type FindAllTasksResponse = AxiosResponse<Task[]>;

export function findAllTasksRequest(): Promise<FindAllTasksResponse> {
  return apiClient.get(`/tasks`);
}
