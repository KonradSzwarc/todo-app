import { AxiosResponse } from 'axios';

import { apiClient } from '@/utils/apiClient';

export type DeleteTaskParams = {
  id: string;
};

export type DeleteTaskResponse = AxiosResponse<boolean>;

export function deleteTaskRequest(params: DeleteTaskParams): Promise<DeleteTaskResponse> {
  return apiClient.delete(`/tasks/${params.id}`);
}
