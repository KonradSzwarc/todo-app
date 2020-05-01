import React from 'react';
import MuiAvatarGroup, { AvatarGroupProps as MuiAvatarGroupProps } from '@material-ui/lab/AvatarGroup';
import { spacing, SpacingProps, sizing, SizingProps } from '@material-ui/system';

import { makeStyles, composeSystem } from '@services/theme';
import { WithMainRef } from '@typings/components';
import { omitProps } from '@utils/omitProps';

export type AvatarGroupProps = MuiAvatarGroupProps & SpacingProps & SizingProps & WithMainRef;

const { system, systemKeys } = composeSystem(spacing, sizing);

const useStyles = makeStyles<AvatarGroupProps>((theme) => ({
  root: (props) => system({ theme, ...props }),
}));

export const AvatarGroup = ({ mainRef, ...props }: AvatarGroupProps) => {
  const classes = useStyles(omitProps(systemKeys, props));

  return <MuiAvatarGroup {...props} classes={classes} ref={mainRef} />;
};
