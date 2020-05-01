import React from 'react';
import PersonIcon from '@material-ui/icons/Person';

import { Avatar } from './Avatar';

export default {
  component: Avatar,
  title: 'Avatar',
  excludeStories: /.*Data$/,
};

export const Image = () => <Avatar src="https://randomuser.me/api/portraits/women/79.jpg" />;

export const Letter = () => <Avatar>JD</Avatar>;

export const Icon = () => (
  <Avatar>
    <PersonIcon />
  </Avatar>
);
