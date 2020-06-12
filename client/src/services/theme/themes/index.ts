/* eslint-disable import/no-cycle */
import { dark } from './dark';
import { light } from './light';

export const themes = { light, dark } as const;
