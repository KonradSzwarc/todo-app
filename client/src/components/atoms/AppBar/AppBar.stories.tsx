import React from 'react';
import { AppBar } from './AppBar';

export default {
  component: AppBar,
  title: 'AppBar',
  excludeStories: /.*Data$/,
};

export const Simple = () => <AppBar />;
