import { AxiosResponse } from 'axios';

import { apiClient } from '@/utils/apiClient';

export type DeleteUserParams = {
  id: string;
};

export type DeleteUserResponse = AxiosResponse<boolean>;

export function deleteUserRequest(params: DeleteUserParams): Promise<DeleteUserResponse> {
  return apiClient.delete(`/users/${params.id}`);
}
