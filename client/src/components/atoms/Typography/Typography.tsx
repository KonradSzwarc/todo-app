import React from 'react';
import MuiTypography, { TypographyProps as MuiTypographyProps, TypographyTypeMap } from '@material-ui/core/Typography';
import { spacing, SpacingProps, sizing, SizingProps } from '@material-ui/system';

import { makeStyles, composeSystem } from '@services/theme';
import { WithMainRef } from '@typings/components';
import { omitProps } from '@utils/omitProps';

export type TypographyProps<
  D extends React.ElementType = TypographyTypeMap['defaultComponent'],
  P = {}
> = MuiTypographyProps<D, P> & SpacingProps & SizingProps & WithMainRef;

const { system, systemKeys } = composeSystem(spacing, sizing);

const useStyles = makeStyles<TypographyProps>((theme) => ({
  root: (props) => system({ theme, ...props }),
}));

export const Typography = <D extends React.ElementType = TypographyTypeMap['defaultComponent']>({
  mainRef,
  ...props
}: TypographyProps<D, { component?: D }>) => {
  const classes = useStyles(omitProps(systemKeys, props));

  return <MuiTypography {...props} classes={classes} ref={mainRef} />;
};
