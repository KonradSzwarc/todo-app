import { AxiosResponse } from 'axios';

import { Language } from '@/models/Language';
import { ThemeKey } from '@/models/ThemeKey';
import { User } from '@/models/User';
import { apiClient } from '@/utils/apiClient';

export type UpdateUserParams = {
  id: string;
};

export type UpdateUserBody = {
  language?: Language;
  theme?: ThemeKey;
  fullName?: string;
  email?: string;
};

export type UpdateUserResponse = AxiosResponse<User>;

export function updateUserRequest(params: UpdateUserParams, body: UpdateUserBody): Promise<UpdateUserResponse> {
  return apiClient.patch(`/users/${params.id}`, body);
}
