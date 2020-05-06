import React from 'react';
import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from '@material-ui/core/Checkbox';
import { spacing, sizing } from '@material-ui/system';

import { composeSystem, styled, SpacingProps, SizingProps } from '@services/theme';
import { WithMainRef } from '@typings/components';

export type CheckboxProps = MuiCheckboxProps & SpacingProps & SizingProps & WithMainRef;

const { system, systemKeys } = composeSystem(spacing, sizing);

const StyledCheckbox = styled(MuiCheckbox, { omitKeys: systemKeys })<CheckboxProps>(system);

export const Checkbox = ({ mainRef, ...props }: CheckboxProps) => {
  return <StyledCheckbox {...props} ref={mainRef} />;
};
