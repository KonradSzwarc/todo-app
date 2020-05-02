import { AxiosResponse } from 'axios';
import { apiClient } from '@utils/apiClient';

export type SignInDto = {
  email: string;
  password: string;
};

export enum Language {
  EN = 'en',
  PL = 'pl',
}

export enum ThemeKey {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum TaskStatus {
  TODO = 'TODO',
  DONE = 'DONE',
}

export type User = {
  language: Language;
  theme: ThemeKey;
  id: string;
  fullName: string;
  email: string;
  password: string;
  tasks: Task[];
};

export type Task = {
  status: TaskStatus;
  id: string;
  title: string;
  user: User;
  userId: string;
};

export type CreateUserDto = {
  fullName: string;
  email: string;
  password: string;
};

export type UpdateUserDto = {
  language?: Language;
  theme?: ThemeKey;
  fullName?: string;
  email?: string;
};

export type CreateTaskDto = {
  content: string;
};

export type UpdateTaskDto = {
  status?: TaskStatus;
  content?: string;
};

export type SignInBody = SignInDto;

export type SignInResponse = AxiosResponse<boolean>;

export function signInRequest(body: SignInBody): Promise<SignInResponse> {
  return apiClient.post(`/auth/sign-in`, body);
}

export type SignOutResponse = AxiosResponse<boolean>;

export function signOutRequest(): Promise<SignOutResponse> {
  return apiClient.post(`/auth/sign-out`);
}

export type QueryAllUsersResponse = AxiosResponse<User[]>;

export function queryAllUsersRequest(): Promise<QueryAllUsersResponse> {
  return apiClient.get(`/users`);
}

export type CreateUserBody = CreateUserDto;

export type CreateUserResponse = AxiosResponse<User>;

export function createUserRequest(body: CreateUserBody): Promise<CreateUserResponse> {
  return apiClient.post(`/users`, body);
}

export type QueryCurrentUserResponse = AxiosResponse<User>;

export function queryCurrentUserRequest(): Promise<QueryCurrentUserResponse> {
  return apiClient.get(`/users/current`);
}

export type UpdateCurrentUserBody = UpdateUserDto;

export type UpdateCurrentUserResponse = AxiosResponse<User>;

export function updateCurrentUserRequest(body: UpdateCurrentUserBody): Promise<UpdateCurrentUserResponse> {
  return apiClient.patch(`/users/current`, body);
}

export type DeleteCurrentUserResponse = AxiosResponse<boolean>;

export function deleteCurrentUserRequest(): Promise<DeleteCurrentUserResponse> {
  return apiClient.delete(`/users/current`);
}

export type FindOneUserParams = {
  id: string;
};

export type FindOneUserResponse = AxiosResponse<User>;

export function findOneUserRequest(params: FindOneUserParams): Promise<FindOneUserResponse> {
  return apiClient.get(`/users/${params.id}`);
}

export type UpdateUserParams = {
  id: string;
};

export type UpdateUserBody = UpdateUserDto;

export type UpdateUserResponse = AxiosResponse<User>;

export function updateUserRequest(params: UpdateUserParams, body: UpdateUserBody): Promise<UpdateUserResponse> {
  return apiClient.patch(`/users/${params.id}`, body);
}

export type DeleteUserParams = {
  id: string;
};

export type DeleteUserResponse = AxiosResponse<boolean>;

export function deleteUserRequest(params: DeleteUserParams): Promise<DeleteUserResponse> {
  return apiClient.delete(`/users/${params.id}`);
}

export type QueryAllTasksResponse = AxiosResponse<Task[]>;

export function queryAllTasksRequest(): Promise<QueryAllTasksResponse> {
  return apiClient.get(`/tasks`);
}

export type CreateTaskBody = CreateTaskDto;

export type CreateTaskResponse = AxiosResponse<Task>;

export function createTaskRequest(body: CreateTaskBody): Promise<CreateTaskResponse> {
  return apiClient.post(`/tasks`, body);
}

export type UpdateTaskParams = {
  id: string;
};

export type UpdateTaskBody = UpdateTaskDto;

export type UpdateTaskResponse = AxiosResponse<Task>;

export function updateTaskRequest(params: UpdateTaskParams, body: UpdateTaskBody): Promise<UpdateTaskResponse> {
  return apiClient.put(`/tasks/${params.id}`, body);
}

export type DeleteTaskParams = {
  id: string;
};

export type DeleteTaskResponse = AxiosResponse<boolean>;

export function deleteTaskRequest(params: DeleteTaskParams): Promise<DeleteTaskResponse> {
  return apiClient.delete(`/tasks/${params.id}`);
}
