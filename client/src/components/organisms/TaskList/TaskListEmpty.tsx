import InboxIcon from '@material-ui/icons/Inbox';
import React from 'react';

import { Paper } from '@/components/atoms/Paper';
import { Typography } from '@/components/atoms/Typography';
import { styled } from '@/services/theme';

const TaskListContainer = styled(Paper)({
  width: '100%',
  height: 360,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

const EmptyIcon = styled(InboxIcon)(({ theme }) => ({
  fontSize: theme.typography.h2.fontSize,
  color: theme.palette.primary.main,
}));

const Heading = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  fontWeight: theme.typography.fontWeightBold,
}));

export const TaskListEmpty = () => {
  return (
    <TaskListContainer data-testid="task-list-empty">
      <EmptyIcon />
      <Heading>You have no tasks</Heading>
      <Typography color="textSecondary">Sit back and relax or add a new task</Typography>
    </TaskListContainer>
  );
};
