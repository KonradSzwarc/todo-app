/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { queries, Queries } from '@testing-library/dom';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { FC } from '@typings/components';
import { PureThemeProvider } from '@services/theme';

type ProvidersProps = {};

const Providers: FC = ({ children }) => {
  return (
    <PureThemeProvider language="en" theme="light">
      <BrowserRouter>{children}</BrowserRouter>
    </PureThemeProvider>
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
