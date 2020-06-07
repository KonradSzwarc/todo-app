import { AxiosResponse } from 'axios';

import { apiClient } from '@/utils/apiClient';

export type SignInBody = {
  email: string;
  password: string;
};

export type SignInResponse = AxiosResponse<boolean>;

export function signInRequest(body: SignInBody): Promise<SignInResponse> {
  return apiClient.post(`/auth/sign-in`, body);
}
