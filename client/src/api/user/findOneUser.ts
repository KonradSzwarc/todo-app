import { AxiosResponse } from 'axios';

import { User } from '@/models/User';
import { apiClient } from '@/utils/apiClient';

export type FindOneUserParams = {
  id: string;
};

export type FindOneUserResponse = AxiosResponse<User>;

export function findOneUserRequest(params: FindOneUserParams): Promise<FindOneUserResponse> {
  return apiClient.get(`/users/${params.id}`);
}
