import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { queries, Queries } from '@testing-library/dom';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { FC } from '@typings/components';
import { PureThemeProvider } from '@services/theme';
import { PureTranslationProvider } from '@services/translation';

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
