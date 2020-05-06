import React from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@material-ui/core/AppBar';
import { spacing, sizing } from '@material-ui/system';

import { composeSystem, styled, SpacingProps, SizingProps } from '@services/theme';
import { WithMainRef } from '@typings/components';

export type AppBarProps = MuiAppBarProps & SpacingProps & SizingProps & WithMainRef;

const { system, systemKeys } = composeSystem(spacing, sizing);

const StyledAppBar = styled(MuiAppBar, { omitKeys: systemKeys })<AppBarProps>(system);

export const AppBar = ({ mainRef, ...props }: AppBarProps) => {
  return <StyledAppBar {...props} ref={mainRef} />;
};
