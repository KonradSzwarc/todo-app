import { routing } from './routing';

export type Routing = typeof routing;
export type RouteKey = keyof Routing;

type RouteValue = Routing[RouteKey];
type RoutePath = Routing[RouteKey]['route']['path'];

export const routingByPath = Object.entries(routing).reduce((acc, [key, value]) => {
  return { ...acc, [value.route.path]: { key, ...value } };
}, {} as Record<RoutePath, RouteValue & { key: RouteKey }>);
