import React, { useEffect, memo, useRef } from 'react';
import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import { I18nextProvider } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { useCurrentUserState } from '@store/currentUser';
import { useEffectOnce } from 'react-use';
import { FC } from '@typings/components';

export type TranslationProviderProps = {
  language?: 'pl' | 'en';
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
  ({ children, language = 'en' }) => {
    const initialized = useRef(false);

    useKeySequence('langg', () => {
      const newLang = i18n.language === 'pl' ? 'en' : 'pl';

      i18n.loadLanguages(newLang, () => {
        i18n.changeLanguage(newLang);
      });
    });

    if (!initialized.current) {
      initialized.current = true;

      if (process.env.NODE_ENV === 'test') {
        i18n.init({
          lng: language,
          fallbackLng: 'en',
          resources: {
            en: {},
            pl: {},
          },
          interpolation: { escapeValue: false },
        });
      } else {
        i18n
          .use(XHR)
          .use(LanguageDetector)
          .init({
            lng: language,
            fallbackLng: 'en',
            load: 'languageOnly',
            whitelist: ['en', 'pl'],
            defaultNS: 'translation',
            interpolation: { escapeValue: false },
          });
      }
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
