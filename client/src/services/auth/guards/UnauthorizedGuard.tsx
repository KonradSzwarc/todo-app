import React from 'react';
import { Redirect } from 'react-router-dom';

import { FC } from '@/typings/components';

import { useUserAuthorization } from '../hooks/useIsUserAuthorized';

export const UnauthorizedGuard: FC = ({ children }) => {
  const { isUserAuthorized } = useUserAuthorization();

  if (isUserAuthorized) {
    return <Redirect to="/app" />;
  }

  return <>{children}</>;
};
