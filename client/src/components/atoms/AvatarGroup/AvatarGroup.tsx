import React from 'react';
import MuiAvatarGroup, { AvatarGroupProps as MuiAvatarGroupProps } from '@material-ui/lab/AvatarGroup';
import { spacing, sizing } from '@material-ui/system';

import { composeSystem, styled, SpacingProps, SizingProps } from '@services/theme';
import { WithMainRef } from '@typings/components';

export type AvatarGroupProps = MuiAvatarGroupProps & SpacingProps & SizingProps & WithMainRef;

const { system, systemKeys } = composeSystem(spacing, sizing);

const StyledAvatarGroup = styled(MuiAvatarGroup, { omitKeys: systemKeys })<AvatarGroupProps>(system);

export const AvatarGroup = ({ mainRef, ...props }: AvatarGroupProps) => {
  return <StyledAvatarGroup {...props} ref={mainRef} />;
};
