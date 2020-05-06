import React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps, ButtonTypeMap } from '@material-ui/core/Button';
import { spacing, sizing } from '@material-ui/system';

import { composeSystem, styled, SpacingProps, SizingProps } from '@services/theme';
import { WithMainRef } from '@typings/components';

export type ButtonProps<D extends React.ElementType = ButtonTypeMap['defaultComponent'], P = {}> = MuiButtonProps<
  D,
  P
> &
  SpacingProps &
  SizingProps &
  WithMainRef;

const { system, systemKeys } = composeSystem(spacing, sizing);

const StyledButton = styled(MuiButton, { omitKeys: systemKeys })<ButtonProps>(system);

export const Button = <D extends React.ElementType = ButtonTypeMap['defaultComponent']>({
  mainRef,
  ...props
}: ButtonProps<D, { component?: D }>) => {
  return <StyledButton {...props} ref={mainRef} />;
};
