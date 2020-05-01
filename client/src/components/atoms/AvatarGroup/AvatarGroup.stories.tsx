import React from 'react';

import { Avatar } from '../Avatar';
import { AvatarGroup } from './AvatarGroup';

export default {
  component: AvatarGroup,
  title: 'AvatarGroup',
  excludeStories: /.*Data$/,
};

const avatarGroupData = [
  'https://randomuser.me/api/portraits/women/79.jpg',
  'https://randomuser.me/api/portraits/men/11.jpg',
  'https://randomuser.me/api/portraits/women/82.jpg',
  'https://randomuser.me/api/portraits/men/9.jpg',
  'https://randomuser.me/api/portraits/women/57.jpg',
];

export const WithoutOverload = () => (
  <AvatarGroup>
    {avatarGroupData.map((src) => (
      <Avatar key={src} src={src} />
    ))}
  </AvatarGroup>
);

export const WithOverload = () => (
  <AvatarGroup max={3}>
    {avatarGroupData.map((src) => (
      <Avatar key={src} src={src} />
    ))}
  </AvatarGroup>
);
