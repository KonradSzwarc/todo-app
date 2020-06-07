import { AxiosResponse } from 'axios';

import { Task } from '@/models/Task';
import { apiClient } from '@/utils/apiClient';

export type QueryAllTasksResponse = AxiosResponse<Task[]>;

export function queryAllTasksRequest(): Promise<QueryAllTasksResponse> {
  return apiClient.get(`/tasks`);
}
