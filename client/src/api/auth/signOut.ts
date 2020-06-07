import { AxiosResponse } from 'axios';

import { apiClient } from '@/utils/apiClient';

export type SignOutResponse = AxiosResponse<boolean>;

export function signOutRequest(): Promise<SignOutResponse> {
  return apiClient.post(`/auth/sign-out`);
}
