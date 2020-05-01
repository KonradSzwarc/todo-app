import React from 'react';
import { AsyncState } from '@store/utils';
import { User } from '@generated/api';
import { FC } from '@typings/components';
import { useEffectOnce, usePrevious } from 'react-use';
import { useCurrentUserState, useCurrentUserActions } from '@store/currentUser';

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
