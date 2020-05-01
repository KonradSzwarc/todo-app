import React from 'react';
import MuiAvatar, { AvatarProps as MuiAvatarProps, AvatarTypeMap } from '@material-ui/core/Avatar';
import { spacing, SpacingProps, sizing, SizingProps } from '@material-ui/system';

import { makeStyles, composeSystem } from '@services/theme';
import { WithMainRef } from '@typings/components';
import { omitProps } from '@utils/omitProps';

export type AvatarProps<D extends React.ElementType = AvatarTypeMap['defaultComponent'], P = {}> = MuiAvatarProps<
  D,
  P
> &
  SpacingProps &
  SizingProps &
  WithMainRef;

const { system, systemKeys } = composeSystem(spacing, sizing);

const useStyles = makeStyles<AvatarProps>((theme) => ({
  root: (props) => system({ theme, ...props }),
}));

export const Avatar = <D extends React.ElementType = AvatarTypeMap['defaultComponent']>({
  mainRef,
  ...props
}: AvatarProps<D, { component?: D }>) => {
  const classes = useStyles(omitProps(systemKeys, props));

  return <MuiAvatar {...props} classes={classes} ref={mainRef} />;
};
