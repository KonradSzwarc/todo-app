import { AxiosResponse } from 'axios';

import { User } from '@/models/User';
import { apiClient } from '@/utils/apiClient';

export type QueryAllUsersResponse = AxiosResponse<User[]>;

export function queryAllUsersRequest(): Promise<QueryAllUsersResponse> {
  return apiClient.get(`/users`);
}
