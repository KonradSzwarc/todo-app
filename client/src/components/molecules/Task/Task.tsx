import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import { makeStyles } from '@services/theme';
import { Paper } from '@components/atoms/Paper';
import { Checkbox } from '@components/atoms/Checkbox';
import { Typography } from '@components/atoms/Typography';

export type TaskProps = {
  id: string;
  title: string;
  status: 'TODO' | 'DONE';
  pinned: boolean;
  onPinClick: (id: string, value: boolean) => void;
  onDoneClick: (id: string, value: boolean) => void;
};

const useStyles = makeStyles((theme) => ({
  activeStar: {
    color: theme.palette.primary.main,
  },
}));

export const Task = (props: TaskProps) => {
  const classes = useStyles();
  const isDone = props.status === 'DONE';

  return (
    <Paper data-testid={`task-${props.id}`} px={3} py={1} display="flex" alignItems="center">
      <Checkbox checked={isDone} onClick={() => props.onDoneClick(props.id, !isDone)} />
      <Typography mr="auto">{props.title}</Typography>
      {props.pinned ? (
        <StarIcon className={classes.activeStar} onClick={() => props.onPinClick(props.id, false)} />
      ) : (
        <StarBorderIcon onClick={() => props.onPinClick(props.id, true)} />
      )}
    </Paper>
  );
};
