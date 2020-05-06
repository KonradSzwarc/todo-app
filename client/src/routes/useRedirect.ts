import { useHistory } from 'react-router-dom';
import { routingByPath } from './routingByPath';

type Params = Record<string, string | number>;
type RoutePath = keyof typeof routingByPath;

const interpolateParams = (path: string, params?: Params) =>
  params ? Object.keys(params).reduce((result, key) => result.replace(`:${key}`, params[key].toString()), path) : path;

export const useRedirect = () => {
  const history = useHistory();

  const createRedirect = (to: RoutePath, params?: Params) => {
    routingByPath[to].preload();

    return () => history.push(interpolateParams(to, params));
  };

  return { createRedirect };
};
