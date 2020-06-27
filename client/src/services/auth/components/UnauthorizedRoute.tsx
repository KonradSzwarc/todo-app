import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { UnauthorizedGuard } from '../guards/UnauthorizedGuard';

export const UnauthorizedRoute = (props: RouteProps) => {
  return (
    <UnauthorizedGuard>
      <Route {...props} />
    </UnauthorizedGuard>
  );
};
