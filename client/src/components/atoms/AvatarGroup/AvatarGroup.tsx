import MuiAvatarGroup, { AvatarGroupProps as MuiAvatarGroupProps } from '@material-ui/lab/AvatarGroup';
import { sizing, spacing } from '@material-ui/system';
import React from 'react';

import { composeSystem, SizingProps, SpacingProps, styled } from '@/services/theme';
import { WithMainRef } from '@/typings/components';

export type AvatarGroupProps = MuiAvatarGroupProps & SpacingProps & SizingProps & WithMainRef;

const { system, systemKeys } = composeSystem(spacing, sizing);

const StyledAvatarGroup = styled(MuiAvatarGroup, { omitKeys: systemKeys })<AvatarGroupProps>(system);

export const AvatarGroup = ({ mainRef, ...props }: AvatarGroupProps) => {
  return <StyledAvatarGroup {...props} ref={mainRef} />;
};
