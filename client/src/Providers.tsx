import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { TranslationProvider } from '@services/translation';
import { ValidationProvider } from '@services/validation';
import { ThemeProvider } from '@services/theme';
import { WaitForUser } from '@services/auth';
import { store } from '@store/store';
import { FC } from '@typings/components';

export const Providers: FC = ({ children }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <WaitForUser>
          <TranslationProvider>
            <ValidationProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </ValidationProvider>
          </TranslationProvider>
        </WaitForUser>
      </Provider>
    </BrowserRouter>
  );
};
