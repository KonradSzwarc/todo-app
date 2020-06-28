import { User } from './User';

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
  user: User;
  userId: string;
};
