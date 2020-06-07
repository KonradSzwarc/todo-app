import { AxiosResponse } from 'axios';

import { User } from '@/models/User';
import { apiClient } from '@/utils/apiClient';

export type CreateUserBody = {
  fullName: string;
  email: string;
  password: string;
};

export type CreateUserResponse = AxiosResponse<User>;

export function createUserRequest(body: CreateUserBody): Promise<CreateUserResponse> {
  return apiClient.post(`/users`, body);
}
