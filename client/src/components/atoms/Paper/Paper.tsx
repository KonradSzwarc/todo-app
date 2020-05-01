import React from 'react';
import MuiPaper, { PaperProps as MuiPaperProps } from '@material-ui/core/Paper';
import {
  spacing,
  SpacingProps,
  sizing,
  SizingProps,
  flexbox,
  FlexboxProps,
  display,
  DisplayProps,
} from '@material-ui/system';

import { makeStyles, composeSystem } from '@services/theme';
import { WithMainRef } from '@typings/components';
import { omitProps } from '@utils/omitProps';

export type PaperProps = MuiPaperProps & SpacingProps & SizingProps & WithMainRef & FlexboxProps & DisplayProps;

const { system, systemKeys } = composeSystem(spacing, sizing, flexbox, display);

const useStyles = makeStyles<PaperProps>((theme) => ({
  root: (props) => system({ theme, ...props }),
}));

export const Paper = ({ mainRef, ...props }: PaperProps) => {
  const classes = useStyles(omitProps(systemKeys, props));

  return <MuiPaper {...props} classes={classes} ref={mainRef} />;
};

Paper.defaultProps = {
  elevation: 0,
};
