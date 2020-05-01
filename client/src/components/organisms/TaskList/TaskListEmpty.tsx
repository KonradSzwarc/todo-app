import React from 'react';
import InboxIcon from '@material-ui/icons/Inbox';

import { makeStyles } from '@services/theme';
import { Paper } from '@components/atoms/Paper';
import { Typography } from '@components/atoms/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    height: 360,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  icon: {
    fontSize: theme.typography.h2.fontSize,
    color: theme.palette.primary.main,
  },
  header: {
    marginTop: theme.spacing(1),
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export const TaskListEmpty = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} data-testid="task-list-empty">
      <InboxIcon className={classes.icon} />
      <Typography className={classes.header}>You have no tasks</Typography>
      <Typography color="textSecondary">Sit back and relax or add a new task</Typography>
    </Paper>
  );
};
