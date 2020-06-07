import { Queries, queries } from '@testing-library/dom';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { PureThemeProvider } from '@/services/theme';
import { PureTranslationProvider } from '@/services/translation';
import { FC } from '@/typings/components';

type ProvidersProps = {};

const Providers: FC = ({ children }) => {
  return (
    <PureTranslationProvider>
      <PureThemeProvider language="en" theme="light">
        <BrowserRouter>{children}</BrowserRouter>
      </PureThemeProvider>
    </PureTranslationProvider>
  );
};

function customRender<Q extends Queries = typeof queries>(
  ui: React.ReactElement,
  additionalProps: ProvidersProps = {},
  options: RenderOptions<Q> = {},
): RenderResult<Q> {
  return render<Q>(<Providers {...additionalProps}>{ui}</Providers>, options);
}

export { customRender as render };
