import MuiButton, { ButtonProps as MuiButtonProps, ButtonTypeMap } from '@material-ui/core/Button';
import { sizing, spacing } from '@material-ui/system';
import React from 'react';

import { composeSystem, SizingProps, SpacingProps, styled } from '@/services/theme';
import { WithMainRef } from '@/typings/components';

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
