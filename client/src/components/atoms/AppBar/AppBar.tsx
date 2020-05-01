import React from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@material-ui/core/AppBar';
import { spacing, SpacingProps, sizing, SizingProps } from '@material-ui/system';

import { makeStyles, composeSystem } from '@services/theme';
import { WithMainRef } from '@typings/components';
import { omitProps } from '@utils/omitProps';

export type AppBarProps = MuiAppBarProps & SpacingProps & SizingProps & WithMainRef;

const { system, systemKeys } = composeSystem(spacing, sizing);

const useStyles = makeStyles<AppBarProps>((theme) => ({
  root: (props) => system({ theme, ...props }),
}));

export const AppBar = ({ mainRef, ...props }: AppBarProps) => {
  const classes = useStyles(omitProps(systemKeys, props));

  return <MuiAppBar {...props} classes={classes} ref={mainRef} />;
};
