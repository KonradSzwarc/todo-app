import { useUserAuthorization } from './useIsUserAuthorized';

export const useAuthorizedUser = () => {
  const { isUserAuthorized, user } = useUserAuthorization();

  if (!isUserAuthorized) {
    throw new Error('useAuthorizedUser can be used only inside routes wrapped in the AuthorizedGuard');
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return user!;
};
