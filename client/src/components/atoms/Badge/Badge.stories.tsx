import React from 'react';
import MailIcon from '@material-ui/icons/Mail';

import { Badge } from './Badge';

export default {
  component: Badge,
  title: 'Badge',
  excludeStories: /.*Data$/,
};

export const Basic = () => (
  <Badge badgeContent={4} color="primary">
    <MailIcon />
  </Badge>
);

export const Overloaded = () => (
  <Badge badgeContent={200} max={99} color="primary">
    <MailIcon />
  </Badge>
);

export const Dot = () => (
  <Badge variant="dot" color="primary">
    <MailIcon />
  </Badge>
);
