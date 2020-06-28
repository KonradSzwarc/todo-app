import { AxiosResponse } from 'axios';

import { User } from '@/models/User';
import { apiClient } from '@/utils/apiClient';

export type FindAllUsersResponse = AxiosResponse<User[]>;

export function findAllUsersRequest(): Promise<FindAllUsersResponse> {
  return apiClient.get(`/users`);
}
