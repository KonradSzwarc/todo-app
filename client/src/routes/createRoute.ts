import { LoadableComponent } from '@loadable/component';
import { Translations } from '@generated/translations';
import i18next from 'i18next';

type RouteConfig<T> = {
  path: T;
  exact?: boolean;
  component: LoadableComponent<unknown>;
  translationsNS: keyof Translations;
};

export const createRoute = <T extends string>({ path, exact, component, translationsNS }: RouteConfig<T>) => {
  return {
    route: {
      path,
      exact,
      component,
    },
    preload: () => {
      i18next.loadNamespaces(translationsNS);
      component.preload();
    },
  };
};
