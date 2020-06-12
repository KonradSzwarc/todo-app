import MuiBadge, { BadgeProps as MuiBadgeProps, BadgeTypeMap } from '@material-ui/core/Badge';
import { sizing, spacing } from '@material-ui/system';
import React from 'react';

import { composeSystem, SizingProps, SpacingProps, styled } from '@/services/theme';
import { WithMainRef } from '@/typings/components';

export type BadgeProps<D extends React.ElementType = BadgeTypeMap['defaultComponent'], P = {}> = MuiBadgeProps<D, P> &
  SpacingProps &
  SizingProps &
  WithMainRef;

const { system, systemKeys } = composeSystem(spacing, sizing);

const StyledBadge = styled(MuiBadge, { omitKeys: systemKeys })<Omit<BadgeProps, 'children'>>(system);

export const Badge = <D extends React.ElementType = BadgeTypeMap['defaultComponent']>({
  children,
  mainRef,
  ...props
}: BadgeProps<D, { component?: D }>) => {
  return (
    <StyledBadge {...props} ref={mainRef}>
      {children}
    </StyledBadge>
  );
};
