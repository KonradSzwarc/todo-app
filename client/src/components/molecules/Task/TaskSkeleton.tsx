import React from 'react';

import { Box } from '@/components/atoms/Box';
import { Paper } from '@/components/atoms/Paper';
import { Skeleton } from '@/components/atoms/Skeleton';

export const TaskSkeleton = () => (
  <Paper data-testid="task-skeleton" px={3} py={1} display="flex" alignItems="center">
    <Box p={1.125}>
      <Skeleton variant="rect" width={24} height={24} />
    </Box>
    <Skeleton variant="text" width={200} height={24} />
    <Skeleton ml="auto" variant="circle" width={24} height={24} />
  </Paper>
);
