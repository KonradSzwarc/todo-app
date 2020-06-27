import { useContext } from 'react';

import { WaitForUserContext } from '../guards/WaitForUser';

export const useUserAuthorization = () => {
  const waitForUser = useContext(WaitForUserContext);

  if (!waitForUser) {
    throw new Error('useUserAuthorization can be used only inside routes wrapped in the WaitForUser component');
  }

  return waitForUser;
};
