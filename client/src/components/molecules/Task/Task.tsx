import React from 'react';

import { Checkbox } from '@/components/atoms/Checkbox';
import { Paper } from '@/components/atoms/Paper';
import { Typography } from '@/components/atoms/Typography';

export type TaskProps = {
  id: string;
  title: string;
  isDone: boolean;
  onDoneClick: (id: string, isDone: boolean) => void;
};

export const Task = (props: TaskProps) => {
  const handleCheckboxClick = () => props.onDoneClick(props.id, !props.isDone);

  return (
    <Paper data-testid={`task-${props.id}`} px={3} py={1} display="flex" alignItems="center">
      <Checkbox checked={props.isDone} onClick={handleCheckboxClick} />
      <Typography mr="auto">{props.title}</Typography>
    </Paper>
  );
};
