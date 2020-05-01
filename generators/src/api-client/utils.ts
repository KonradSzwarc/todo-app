import * as util from 'util';
import { NonUndefined } from 'utility-types';

export const iterate = <T extends Record<string, any>>(obj: T, callback: (key: keyof T, value: T[keyof T]) => void) => {
  for (const [key, value] of Object.entries(obj)) {
    callback(key, value);
  }
};

export const fullConsoleLog = (...args: unknown[]) =>
  args.map((value) => console.log(util.inspect(value, { showHidden: false, depth: null })));

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const ifVal = <T, P>(x: T, f: (param: NonUndefined<T>) => P) => {
  if (typeof x !== 'undefined') {
    f(x as NonUndefined<T>);
  }
};
