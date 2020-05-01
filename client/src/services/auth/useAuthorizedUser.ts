import { useContext } from 'react';
import { useCurrentUserState } from '@store/currentUser';
import { AuthGuardContext } from './AuthGuard';

export const useAuthorizedUser = () => {
  const currentUser = useCurrentUserState();
  const isAuthorized = useContext(AuthGuardContext);

  if (!isAuthorized) {
    throw new Error('useAuthorizedUser can be used only inside routes wrapped in the AuthGuard');
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return currentUser.data!;
};
