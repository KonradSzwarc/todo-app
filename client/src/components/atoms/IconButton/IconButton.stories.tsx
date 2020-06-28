import StarIcon from '@material-ui/icons/Star';
import React from 'react';

import { IconButton } from './IconButton';

export default {
  component: IconButton,
  title: 'IconButton',
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <IconButton color="primary">
    <StarIcon />
  </IconButton>
);
