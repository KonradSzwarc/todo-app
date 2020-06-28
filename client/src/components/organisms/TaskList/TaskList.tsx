import React, { Fragment } from 'react';

import { Divider } from '@/components/atoms/Divider';
import { Paper } from '@/components/atoms/Paper';
import { Task, TaskProps } from '@/components/molecules/Task';

import { TaskListEmpty } from './TaskListEmpty';
import { TaskListLoading } from './TaskListLoading';

type FunctionProp = 'onDoneClick' | 'onDeleteClick';

type Task = Omit<TaskProps, FunctionProp>;

export type TaskListProps = Pick<TaskProps, FunctionProp> & {
  loading?: boolean;
  tasks: Task[];
};

const tasksSorter = (a: Task, b: Task) => {
  if (a.isDone && !b.isDone) return 1;
  if (!a.isDone && b.isDone) return -1;
  return 0;
};

export const TaskList = ({ loading, tasks, onDoneClick, onDeleteClick }: TaskListProps) => {
  if (loading) {
    return <TaskListLoading />;
  }

  if (tasks.length === 0) {
    return <TaskListEmpty />;
  }

  const sortedTasks = [...tasks].sort(tasksSorter);

  return (
    <Paper data-testid="task-list">
      {sortedTasks.map((task, i) => (
        <Fragment key={task.id}>
          <Task {...task} onDoneClick={onDoneClick} onDeleteClick={onDeleteClick} />
          {i < tasks.length - 1 && <Divider />}
        </Fragment>
      ))}
    </Paper>
  );
};
