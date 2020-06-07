/* eslint-disable @typescript-eslint/no-explicit-any */
import { compose as muiCompose, StyleFunction } from '@material-ui/system';

import { Theme } from './types';

type ComposedArg<T> = T extends Array<(arg: infer P) => any> ? P : never;

export const composeSystem = <T extends StyleFunction<any>[]>(
  ...args: T
): { system: StyleFunction<ComposedArg<T> & { theme: Theme }>; systemKeys: string[] } => {
  const systemKeys: string[] = args.flatMap((x: any) => x.filterProps);

  return { system: muiCompose(...args), systemKeys };
};
