import React from 'react';
import MuiPaper, { PaperProps as MuiPaperProps } from '@material-ui/core/Paper';
import { spacing, sizing, flexbox, display } from '@material-ui/system';

import { composeSystem, styled, SpacingProps, SizingProps, FlexboxProps, DisplayProps } from '@services/theme';
import { WithMainRef } from '@typings/components';

export type PaperProps = MuiPaperProps & SpacingProps & SizingProps & WithMainRef & FlexboxProps & DisplayProps;

const { system, systemKeys } = composeSystem(spacing, sizing, flexbox, display);

const StyledPaper = styled(MuiPaper, { omitKeys: systemKeys })<PaperProps>(system);

export const Paper = ({ mainRef, ...props }: PaperProps) => {
  return <StyledPaper {...props} ref={mainRef} />;
};

Paper.defaultProps = {
  elevation: 0,
};
