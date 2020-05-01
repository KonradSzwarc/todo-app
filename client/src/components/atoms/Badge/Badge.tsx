import React from 'react';
import MuiBadge, { BadgeProps as MuiBadgeProps, BadgeTypeMap } from '@material-ui/core/Badge';
import { spacing, SpacingProps, sizing, SizingProps } from '@material-ui/system';

import { makeStyles, composeSystem } from '@services/theme';
import { WithMainRef } from '@typings/components';
import { omitProps } from '@utils/omitProps';

export type BadgeProps<D extends React.ElementType = BadgeTypeMap['defaultComponent'], P = {}> = MuiBadgeProps<D, P> &
  SpacingProps &
  SizingProps &
  WithMainRef;

const { system, systemKeys } = composeSystem(spacing, sizing);

const useStyles = makeStyles<Omit<BadgeProps, 'children'>>((theme) => ({
  root: (props) => system({ theme, ...props }),
}));

export const Badge = <D extends React.ElementType = BadgeTypeMap['defaultComponent']>({
  children,
  mainRef,
  ...props
}: BadgeProps<D, { component?: D }>) => {
  const classes = useStyles(omitProps(systemKeys, props));

  return (
    <MuiBadge {...props} classes={classes} ref={mainRef}>
      {children}
    </MuiBadge>
  );
};
