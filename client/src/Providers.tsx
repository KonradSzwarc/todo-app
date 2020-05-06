import React, { Suspense } from 'react';
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
    <Suspense fallback={<div style={{ width: '100vw', height: '100vh', backgroundColor: 'red' }} />}>
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
    </Suspense>
  );
};
