import { Language } from './Language';
import { ThemeKey } from './ThemeKey';

export type User = {
  language: Language;
  theme: ThemeKey;
  id: string;
  fullName: string;
  email: string;
  password: string;
};
