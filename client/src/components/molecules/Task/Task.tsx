import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import React from 'react';

import { Checkbox } from '@/components/atoms/Checkbox';
import { Paper } from '@/components/atoms/Paper';
import { Typography } from '@/components/atoms/Typography';
import { styled } from '@/services/theme';

export type TaskProps = {
  id: string;
  title: string;
  status: 'TODO' | 'DONE';
  pinned: boolean;
  onPinClick: (id: string, value: boolean) => void;
  onDoneClick: (id: string, value: boolean) => void;
};

const ActiveStarIcon = styled(StarIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const Task = (props: TaskProps) => {
  const isDone = props.status === 'DONE';

  const handlePinChange = (newValue: boolean) => () => props.onPinClick(props.id, newValue);

  const handleCheckboxClick = () => props.onDoneClick(props.id, !isDone);

  return (
    <Paper data-testid={`task-${props.id}`} px={3} py={1} display="flex" alignItems="center">
      <Checkbox checked={isDone} onClick={handleCheckboxClick} />
      <Typography mr="auto">{props.title}</Typography>
      {props.pinned ? (
        <ActiveStarIcon onClick={handlePinChange(false)} />
      ) : (
        <StarBorderIcon onClick={handlePinChange(true)} />
      )}
    </Paper>
  );
};
