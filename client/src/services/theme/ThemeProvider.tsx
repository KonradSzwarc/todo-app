import { CssBaseline } from '@material-ui/core';
import { enUS, Localization, plPL } from '@material-ui/core/locale';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import React, { memo, useEffect } from 'react';
import { useLocalStorage } from 'react-use';

import { useKeySequence } from '@/hooks/useKeySequence';
import { Language, useI18n } from '@/services/translation';
import { useCurrentUserState } from '@/store/currentUser';
import { FC } from '@/typings/components';

import { DEFAULT_THEME } from './constants';
import { themes } from './themes';
import { Theme, ThemeKey } from './types';

const languages: Record<Language, Localization> = { pl: plPL, en: enUS };

type ThemeProviderProps = {
  language: Language;
  theme?: ThemeKey;
};

export const PureThemeProvider: FC<ThemeProviderProps> = memo(
  ({ children, language, theme = DEFAULT_THEME }) => {
    const [themeKey, setThemeKey] = useLocalStorage<ThemeKey>('muiTheme', theme);

    useEffect(() => {
      if (theme) {
        setThemeKey(theme);
      }
    }, [theme]);

    useKeySequence('themee', () => {
      setThemeKey(themeKey === 'light' ? 'dark' : 'light');
    });

    const languageObject = languages[language];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const themeObject = themes[themeKey!];
    const muiTheme = createMuiTheme(themeObject, languageObject) as Theme;

    return (
      <MuiThemeProvider theme={muiTheme}>
        <EmotionThemeProvider theme={muiTheme}>{children}</EmotionThemeProvider>
      </MuiThemeProvider>
    );
  },
  (prevProps, nextProps) =>
    prevProps.language === nextProps.language && (prevProps.theme === nextProps.theme || !nextProps.theme),
);

export const ThemeProvider: FC = ({ children }) => {
  const currentUser = useCurrentUserState();
  const { currentLanguage } = useI18n();

  return (
    <PureThemeProvider language={currentLanguage} theme={currentUser.data?.theme}>
      <CssBaseline />
      {children}
    </PureThemeProvider>
  );
};
