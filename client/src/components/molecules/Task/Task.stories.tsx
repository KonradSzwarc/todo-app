import { action } from '@storybook/addon-actions';
import React from 'react';

import { Task } from './Task';
import { TaskSkeleton } from './TaskSkeleton';

export default {
  component: Task,
  title: 'Task',
  excludeStories: /.*Data$/,
};

export const taskData = {
  id: '1',
  title: 'Test Task',
  isDone: false,
};

export const actionsData = {
  onPinClick: action('onPinClick'),
  onDoneClick: action('onDoneClick'),
};

export const Default = () => <Task {...taskData} {...actionsData} />;

export const Done = () => <Task {...taskData} isDone {...actionsData} />;

export const Loading = () => <TaskSkeleton />;
