import React from 'react';
import MuiTypography, { TypographyProps as MuiTypographyProps, TypographyTypeMap } from '@material-ui/core/Typography';
import { spacing, sizing } from '@material-ui/system';

import { composeSystem, styled, SpacingProps, SizingProps } from '@services/theme';
import { WithMainRef } from '@typings/components';

export type TypographyProps<
  D extends React.ElementType = TypographyTypeMap['defaultComponent'],
  P = {}
> = MuiTypographyProps<D, P> & SpacingProps & SizingProps & WithMainRef;

const { system, systemKeys } = composeSystem(spacing, sizing);

const StyledTypography = styled(MuiTypography, { omitKeys: systemKeys })<TypographyProps>(system);

export const Typography = <D extends React.ElementType = TypographyTypeMap['defaultComponent']>({
  mainRef,
  ...props
}: TypographyProps<D, { component?: D }>) => {
  return <StyledTypography {...props} ref={mainRef} />;
};
