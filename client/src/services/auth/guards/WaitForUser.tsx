import React, { createContext } from 'react';
import { useEffectOnce, usePrevious } from 'react-use';

import { User } from '@/models/User';
import { useCurrentUserActions, useCurrentUserState } from '@/store/currentUser';
import { AsyncState } from '@/store/types';
import { FC } from '@/typings/components';

type WaitForUserProps = {
  user: AsyncState<User | null>;
};

type WaitForUserContextType = {
  isUserAuthorized: boolean;
  user: User | null;
};

export const WaitForUserContext = createContext<WaitForUserContextType>({} as WaitForUserContextType);

export const PureWaitForUser: FC<WaitForUserProps> = ({ children, user }) => {
  const prevStatus = usePrevious(user.status);

  if (user.status === 'idle' || (user.status === 'loading' && prevStatus === 'idle')) {
    return <div>Loading...</div>;
  }

  return (
    <WaitForUserContext.Provider value={{ isUserAuthorized: Boolean(user.data), user: user.data }}>
      {children}
    </WaitForUserContext.Provider>
  );
};

export const WaitForUser: FC = ({ children }) => {
  const currentUser = useCurrentUserState();
  const { fetchCurrentUser } = useCurrentUserActions();

  useEffectOnce(() => {
    fetchCurrentUser();
  });

  return <PureWaitForUser user={currentUser}>{children}</PureWaitForUser>;
};
