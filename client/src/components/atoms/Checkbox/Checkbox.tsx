import React from 'react';
import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from '@material-ui/core/Checkbox';
import { spacing, SpacingProps, sizing, SizingProps } from '@material-ui/system';

import { makeStyles, composeSystem } from '@services/theme';
import { WithMainRef } from '@typings/components';
import { omitProps } from '@utils/omitProps';

export type CheckboxProps = MuiCheckboxProps & SpacingProps & SizingProps & WithMainRef;

const { system, systemKeys } = composeSystem(spacing, sizing);

const useStyles = makeStyles<CheckboxProps>((theme) => ({
  root: (props) => system({ theme, ...props }),
}));

export const Checkbox = ({ mainRef, ...props }: CheckboxProps) => {
  const classes = useStyles(omitProps(systemKeys, props));

  return <MuiCheckbox {...props} classes={classes} ref={mainRef} />;
};
