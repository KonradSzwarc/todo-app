import { TaskStatus } from './TaskStatus';
import { User } from './User';

export type Task = {
  status: TaskStatus;
  id: string;
  title: string;
  user: User;
  userId: string;
};
