import { useHistory as useRouterHistory } from 'react-router-dom';

export const useHistory = () => {
  const history = useRouterHistory();

  /**
   * Returns a function that can redirect to a provided path.
   * @param path - path to redirect to.
   */
  const redirect = (path: string) => () => history.push(path);

  return {
    ...history,
    redirect,
  };
};
