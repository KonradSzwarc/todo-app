import MuiPaper, { PaperProps as MuiPaperProps } from '@material-ui/core/Paper';
import { display, flexbox, sizing, spacing } from '@material-ui/system';
import React from 'react';

import { composeSystem, DisplayProps, FlexboxProps, SizingProps, SpacingProps, styled } from '@/services/theme';
import { WithMainRef } from '@/typings/components';

export type PaperProps = MuiPaperProps & SpacingProps & SizingProps & WithMainRef & FlexboxProps & DisplayProps;

const { system, systemKeys } = composeSystem(spacing, sizing, flexbox, display);

const StyledPaper = styled(MuiPaper, { omitKeys: systemKeys })<PaperProps>(system);

export const Paper = ({ mainRef, ...props }: PaperProps) => {
  return <StyledPaper {...props} ref={mainRef} />;
};

Paper.defaultProps = {
  elevation: 0,
};
