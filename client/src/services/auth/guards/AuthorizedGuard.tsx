import React from 'react';
import { Redirect } from 'react-router-dom';

import { FC } from '@/typings/components';

import { useUserAuthorization } from '../hooks/useIsUserAuthorized';

export const AuthorizedGuard: FC = ({ children }) => {
  const { isUserAuthorized } = useUserAuthorization();

  if (!isUserAuthorized) {
    return <Redirect to="/sign-in" />;
  }

  return <>{children}</>;
};
