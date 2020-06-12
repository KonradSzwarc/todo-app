import { AxiosResponse } from 'axios';

import { User } from '@/models/User';
import { apiClient } from '@/utils/apiClient';

export type QueryCurrentUserResponse = AxiosResponse<User>;

export function queryCurrentUserRequest(): Promise<QueryCurrentUserResponse> {
  return apiClient.get(`/users/current`);
}
