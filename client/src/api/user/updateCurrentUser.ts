import { AxiosResponse } from 'axios';

import { ThemeKey } from '@/models/ThemeKey';
import { User } from '@/models/User';
import { Language } from '@/services/translation';
import { apiClient } from '@/utils/apiClient';

export type UpdateCurrentUserBody = {
  language?: Language;
  theme?: ThemeKey;
  fullName?: string;
  email?: string;
};

export type UpdateCurrentUserResponse = AxiosResponse<User>;

export function updateCurrentUserRequest(body: UpdateCurrentUserBody): Promise<UpdateCurrentUserResponse> {
  return apiClient.patch(`/users/current`, body);
}
