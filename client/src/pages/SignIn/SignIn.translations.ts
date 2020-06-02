import { createTranslationsHook } from '@services/translation';

const en = {
  emailLabel: 'E-mail',
  passwordLabel: 'Password',
  submitText: 'Login',
};

const pl = {
  emailLabel: 'Adres e-mail',
  passwordLabel: 'Hasło',
  submitText: 'Zaloguj się',
};

export const useSignInTranslations = createTranslationsHook('sign-in', { en, pl });
