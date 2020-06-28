import MuiIconButton, { IconButtonProps as MuiIconButtonProps, IconButtonTypeMap } from '@material-ui/core/IconButton';
import { sizing, spacing } from '@material-ui/system';
import React from 'react';

import { composeSystem, SizingProps, SpacingProps, styled } from '@/services/theme';
import { WithMainRef } from '@/typings/components';

export type IconButtonProps<
  D extends React.ElementType = IconButtonTypeMap['defaultComponent'],
  P = {}
> = MuiIconButtonProps<D, P> & SpacingProps & SizingProps & WithMainRef;

const { system, systemKeys } = composeSystem(spacing, sizing);

const StyledIconButton = styled(MuiIconButton, { omitKeys: systemKeys })<IconButtonProps>(system);

export const IconButton = <D extends React.ElementType = IconButtonTypeMap['defaultComponent']>({
  mainRef,
  ...props
}: IconButtonProps<D, { component?: D }>) => {
  return <StyledIconButton {...props} ref={mainRef} />;
};
