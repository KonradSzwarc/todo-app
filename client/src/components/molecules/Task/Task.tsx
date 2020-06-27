import React from 'react';

import { Checkbox } from '@/components/atoms/Checkbox';
import { Paper } from '@/components/atoms/Paper';
import { Typography } from '@/components/atoms/Typography';
import { TaskStatus } from '@/models/TaskStatus';

export type TaskProps = {
  id: string;
  title: string;
  status: TaskStatus;
  onDoneClick: (id: string, value: TaskStatus) => void;
};

export const Task = (props: TaskProps) => {
  const isDone = props.status === TaskStatus.DONE;

  const handleCheckboxClick = () => props.onDoneClick(props.id, isDone ? TaskStatus.TODO : TaskStatus.DONE);

  return (
    <Paper data-testid={`task-${props.id}`} px={3} py={1} display="flex" alignItems="center">
      <Checkbox checked={isDone} onClick={handleCheckboxClick} />
      <Typography mr="auto">{props.title}</Typography>
    </Paper>
  );
};
