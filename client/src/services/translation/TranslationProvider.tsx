import React, { useEffect, memo, useRef } from 'react';
import { useEffectOnce } from 'react-use';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { useCurrentUserState } from '@store/currentUser';
import { FC } from '@typings/components';

import { Language } from './types';
import { LANGUAGES } from './constants';

export type TranslationProviderProps = {
  language?: Language;
};

const useKeySequence = (sequence: string, callback: () => void) => {
  const pressed: string[] = [];

  useEffectOnce(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      pressed.push(e.key);
      pressed.splice(-sequence.length - 1, pressed.length - sequence.length);

      if (pressed.join('') === sequence) {
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  });
};

export const PureTranslationProvider: FC<TranslationProviderProps> = memo(
  ({ children, language = LANGUAGES.en }) => {
    const initialized = useRef(false);

    useKeySequence('langg', () => {
      const newLang = i18n.language === LANGUAGES.pl ? LANGUAGES.en : LANGUAGES.pl;

      i18n.loadLanguages(newLang, () => {
        i18n.changeLanguage(newLang);
      });
    });

    if (!initialized.current) {
      initialized.current = true;

      i18n.use(LanguageDetector).init({
        lng: language,
        fallbackLng: LANGUAGES.en,
        load: 'languageOnly',
        whitelist: Object.keys(LANGUAGES),
        interpolation: { escapeValue: false },
        resources: {
          en: {},
          pl: {},
        },
      });
    }

    useEffect(() => {
      if (language && i18n.languages && language !== i18n.languages[0]) {
        i18n.loadLanguages(language, () => {
          i18n.changeLanguage(language);
        });
      }
    }, [language]);

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
  },
  (prevProps, nextProps) => prevProps.language === nextProps.language || !nextProps.language,
);

export const TranslationProvider: FC = ({ children }) => {
  const currentUser = useCurrentUserState();

  return <PureTranslationProvider language={currentUser.data?.language}>{children}</PureTranslationProvider>;
};
