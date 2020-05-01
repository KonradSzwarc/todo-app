import React from 'react';
import { CssBaseline, Box } from '@material-ui/core';
import { addDecorator } from '@storybook/react';
import { PureThemeProvider } from '../src/services/theme';

const withGlobal = (story) => (
  <PureThemeProvider theme="light">
    <CssBaseline />
    <Box p={8}>{story()}</Box>
  </PureThemeProvider>
);

addDecorator(withGlobal);
