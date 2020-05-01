import React, { useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from 'react-use';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { plPL, enUS } from '@material-ui/core/locale';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import { useCurrentUserState } from '@store/currentUser';
import { FC } from '@typings/components';

import { Theme } from './types';
import { light, dark } from './themes';

const themes = { light, dark };
const languages = { pl: plPL, en: enUS };

type Language = keyof typeof languages;

type ThemeKey = keyof typeof themes;

type ThemeProviderProps = {
  language: Language;
  theme?: ThemeKey;
};

export const PureThemeProvider: FC<ThemeProviderProps> = memo(
  ({ children, language, theme }) => {
    const [themeKey, setThemeKey] = useLocalStorage<ThemeKey>('muiTheme', theme || 'light');

    useEffect(() => {
      if (theme) {
        setThemeKey(theme);
      }
    }, [theme, setThemeKey]);

    const languageObject = languages[language];
    const themeObject = themes[themeKey];
    const muiTheme = createMuiTheme(themeObject, languageObject) as Theme;

    return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
  },
  (prevProps, nextProps) =>
    prevProps.language === nextProps.language && (prevProps.theme === nextProps.theme || !nextProps.theme),
);

export const ThemeProvider: FC = ({ children }) => {
  const currentUser = useCurrentUserState();
  const { i18n } = useTranslation();

  const language = i18n.languages[0] as Language;

  if (!Object.keys(languages).includes(language)) {
    throw new TypeError(
      `Unsupported language "${language}". Supporded languages are: ${Object.keys(languages).join(', ')}`,
    );
  }

  return (
    <PureThemeProvider language={language} theme={currentUser.data?.theme}>
      <CssBaseline />
      {children}
    </PureThemeProvider>
  );
};
