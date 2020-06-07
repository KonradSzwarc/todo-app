import i18n, { TOptionsBase } from 'i18next';
import { useTranslation as i18nUseTranslation, UseTranslationOptions } from 'react-i18next';

import { DEFAULT_LANGUAGE } from './constants';
import { DefaultLanguage, Language, TranslationResources } from './types';

export const createTranslationsHook = <T extends TranslationResources>(name: string, translations: T) => {
  return (
    options?: UseTranslationOptions,
  ): {
    t: (key: keyof T[DefaultLanguage], options?: TOptionsBase | Record<string, string | number>) => string;
    i18n: typeof i18n;
  } => {
    if (!i18n.hasResourceBundle(DEFAULT_LANGUAGE, name)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const lang of Object.keys(translations)) {
        i18n.addResourceBundle(lang, name, translations[lang as Language], true, true);
      }
    }

    return i18nUseTranslation(name, options);
  };
};
