import React, { useEffect, memo } from 'react';
import { useLocalStorage } from 'react-use';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { plPL, enUS, Localization } from '@material-ui/core/locale';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import { useCurrentUserState } from '@store/currentUser';
import { Language, useI18n } from '@services/translation';
import { FC } from '@typings/components';

import { Theme, ThemeKey } from './types';
import { themes } from './themes';
import { DEFAULT_THEME } from './constants';

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
    }, [theme, setThemeKey]);

    const languageObject = languages[language];
    const themeObject = themes[themeKey];
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
