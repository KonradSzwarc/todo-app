import React, { Fragment } from 'react';

import { Divider } from '@/components/atoms/Divider';
import { Paper } from '@/components/atoms/Paper';
import { Task, TaskProps } from '@/components/molecules/Task';

import { TaskListEmpty } from './TaskListEmpty';
import { TaskListLoading } from './TaskListLoading';

export type TaskListProps = Pick<TaskProps, 'onDoneClick'> & {
  loading?: boolean;
  tasks: Omit<TaskProps, 'onDoneClick'>[];
};

export const TaskList = ({ loading, tasks, onDoneClick }: TaskListProps) => {
  if (loading) {
    return <TaskListLoading />;
  }

  if (tasks.length === 0) {
    return <TaskListEmpty />;
  }

  return (
    <Paper data-testid="task-list">
      {tasks.map((task, i) => (
        <Fragment key={task.id}>
          <Task {...task} onDoneClick={onDoneClick} />
          {i < tasks.length - 1 && <Divider />}
        </Fragment>
      ))}
    </Paper>
  );
};
