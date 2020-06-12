import MuiAvatar, { AvatarProps as MuiAvatarProps, AvatarTypeMap } from '@material-ui/core/Avatar';
import { sizing, spacing } from '@material-ui/system';
import React from 'react';

import { composeSystem, SizingProps, SpacingProps, styled } from '@/services/theme';
import { WithMainRef } from '@/typings/components';

export type AvatarProps<D extends React.ElementType = AvatarTypeMap['defaultComponent'], P = {}> = MuiAvatarProps<
  D,
  P
> &
  SpacingProps &
  SizingProps &
  WithMainRef;

const { system, systemKeys } = composeSystem(spacing, sizing);

const StyledAvatar = styled(MuiAvatar, { omitKeys: systemKeys })<AvatarProps>(system);

export const Avatar = <D extends React.ElementType = AvatarTypeMap['defaultComponent']>({
  mainRef,
  ...props
}: AvatarProps<D, { component?: D }>) => {
  return <StyledAvatar {...props} ref={mainRef} />;
};
