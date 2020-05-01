import React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps, ButtonTypeMap } from '@material-ui/core/Button';
import { spacing, SpacingProps, sizing, SizingProps } from '@material-ui/system';

import { makeStyles, composeSystem } from '@services/theme';
import { WithMainRef } from '@typings/components';
import { omitProps } from '@utils/omitProps';

export type ButtonProps<D extends React.ElementType = ButtonTypeMap['defaultComponent'], P = {}> = MuiButtonProps<
  D,
  P
> &
  SpacingProps &
  SizingProps &
  WithMainRef;

const { system, systemKeys } = composeSystem(spacing, sizing);

const useStyles = makeStyles<ButtonProps>((theme) => ({
  root: (props) => system({ theme, ...props }),
}));

export const Button = <D extends React.ElementType = ButtonTypeMap['defaultComponent']>({
  mainRef,
  ...props
}: ButtonProps<D, { component?: D }>) => {
  const classes = useStyles(omitProps(systemKeys, props));

  return <MuiButton {...props} classes={classes} ref={mainRef} />;
};
