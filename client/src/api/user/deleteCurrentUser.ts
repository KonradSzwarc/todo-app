import { AxiosResponse } from 'axios';

import { apiClient } from '@/utils/apiClient';

export type DeleteCurrentUserResponse = AxiosResponse<boolean>;

export function deleteCurrentUserRequest(): Promise<DeleteCurrentUserResponse> {
  return apiClient.delete(`/users/current`);
}
