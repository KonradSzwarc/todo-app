import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { AuthorizedGuard } from '../guards/AuthorizedGuard';

export const AuthorizedRoute = (props: RouteProps) => {
  return (
    <AuthorizedGuard>
      <Route {...props} />
    </AuthorizedGuard>
  );
};
