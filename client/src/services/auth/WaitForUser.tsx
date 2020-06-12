import React from 'react';
import { useEffectOnce, usePrevious } from 'react-use';

import { User } from '@/models/User';
import { useCurrentUserActions, useCurrentUserState } from '@/store/currentUser';
import { AsyncState } from '@/store/utils';
import { FC } from '@/typings/components';

export type WaitForUserProps = {
  user: AsyncState<User | null>;
};

export const PureWaitForUser: FC<WaitForUserProps> = ({ children, user }) => {
  const prevStatus = usePrevious(user.status);

  if (user.status === 'idle' || (user.status === 'loading' && prevStatus === 'idle')) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export const WaitForUser: FC = ({ children }) => {
  const currentUser = useCurrentUserState();
  const { fetchCurrentUser } = useCurrentUserActions();

  useEffectOnce(() => {
    fetchCurrentUser();
  });

  return <PureWaitForUser user={currentUser}>{children}</PureWaitForUser>;
};
