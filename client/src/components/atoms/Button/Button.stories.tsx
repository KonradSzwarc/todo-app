import React from 'react';

import { Button } from './Button';

export default {
  component: Button,
  title: 'Button',
  excludeStories: /.*Data$/,
};

export const Contained = () => (
  <Button variant="contained" color="primary">
    Contained
  </Button>
);

export const Outlined = () => (
  <Button variant="outlined" color="primary">
    Outlined
  </Button>
);

export const Text = () => (
  <Button variant="text" color="primary">
    Text
  </Button>
);
