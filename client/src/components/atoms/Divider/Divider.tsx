import React from 'react';
import MuiDivider, { DividerProps as MuiDividerProps, DividerTypeMap } from '@material-ui/core/Divider';
import { spacing, SpacingProps, sizing, SizingProps } from '@material-ui/system';

import { makeStyles, composeSystem } from '@services/theme';
import { WithMainRef } from '@typings/components';
import { omitProps } from '@utils/omitProps';

export type DividerProps<D extends React.ElementType = DividerTypeMap['defaultComponent'], P = {}> = MuiDividerProps<
  D,
  P
> &
  SpacingProps &
  SizingProps &
  WithMainRef;

const { system, systemKeys } = composeSystem(spacing, sizing);

const useStyles = makeStyles<DividerProps>((theme) => ({
  root: (props) => system({ theme, ...props }),
}));

export const Divider = <D extends React.ElementType = DividerTypeMap['defaultComponent']>({
  mainRef,
  ...props
}: DividerProps<D, { component?: D }>) => {
  const classes = useStyles(omitProps(systemKeys, props));

  return <MuiDivider {...props} classes={classes} ref={mainRef} />;
};
