import MuiDivider, { DividerProps as MuiDividerProps, DividerTypeMap } from '@material-ui/core/Divider';
import { sizing, spacing } from '@material-ui/system';
import React from 'react';

import { composeSystem, SizingProps, SpacingProps, styled } from '@/services/theme';
import { WithMainRef } from '@/typings/components';

export type DividerProps<D extends React.ElementType = DividerTypeMap['defaultComponent'], P = {}> = MuiDividerProps<
  D,
  P
> &
  SpacingProps &
  SizingProps &
  WithMainRef;

const { system, systemKeys } = composeSystem(spacing, sizing);

const StyledDivider = styled(MuiDivider, { omitKeys: systemKeys })<DividerProps>(system);

export const Divider = <D extends React.ElementType = DividerTypeMap['defaultComponent']>({
  mainRef,
  ...props
}: DividerProps<D, { component?: D }>) => {
  return <StyledDivider {...props} ref={mainRef} />;
};
