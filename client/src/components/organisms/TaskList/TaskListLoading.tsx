import React, { Fragment } from 'react';

import { Paper } from '@components/atoms/Paper';
import { Divider } from '@components/atoms/Divider';
import { TaskSkeleton } from '@components/molecules/Task';

export const TaskListLoading = () => {
  return (
    <Paper data-testid="task-list-loading">
      {[...Array(5).keys()].map((key, i, arr) => (
        <Fragment key={key}>
          <TaskSkeleton />
          {i < arr.length - 1 && <Divider light />}
        </Fragment>
      ))}
    </Paper>
  );
};
