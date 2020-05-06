import loadable from '@loadable/component';
import { createRoute } from './createRoute';

export const routing = {
  home: createRoute({
    path: '/',
    exact: true,
    component: loadable(() => import('../pages/Home')),
    translationsNS: 'home',
  }),
  about: createRoute({
    path: '/about/:id',
    exact: true,
    component: loadable(() => import('../pages/About')),
    translationsNS: 'about',
  }),
  contact: createRoute({
    path: '/contact',
    exact: true,
    component: loadable(() => import('../pages/Contact')),
    translationsNS: 'contact',
  }),
  signIn: createRoute({
    path: '/sign-in',
    exact: true,
    component: loadable(() => import('../pages/SignIn')),
    translationsNS: 'sign-in',
  }),
};
