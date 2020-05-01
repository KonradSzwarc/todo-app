import React, { Fragment } from 'react';

import { Paper } from '@components/atoms/Paper';
import { Divider } from '@components/atoms/Divider';
import { Task, TaskProps } from '@components/molecules/Task';

import { TaskListLoading } from './TaskListLoading';
import { TaskListEmpty } from './TaskListEmpty';

type TaskMethods = 'onPinClick' | 'onDoneClick';

type TaskListProps = Pick<TaskProps, TaskMethods> & {
  loading?: boolean;
  tasks: Omit<TaskProps, TaskMethods>[];
};

export const TaskList = ({ loading, tasks, onPinClick, onDoneClick }: TaskListProps) => {
  if (loading) {
    return <TaskListLoading />;
  }

  if (tasks.length === 0) {
    return <TaskListEmpty />;
  }

  const orderedTasks = tasks.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  return (
    <Paper data-testid="task-list">
      {orderedTasks.map((task, i) => (
        <Fragment key={task.id}>
          <Task {...task} onPinClick={onPinClick} onDoneClick={onDoneClick} />
          {i < tasks.length - 1 && <Divider />}
        </Fragment>
      ))}
    </Paper>
  );
};
