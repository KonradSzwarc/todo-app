import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from '@material-ui/core/Checkbox';
import { sizing, spacing } from '@material-ui/system';
import React from 'react';

import { composeSystem, SizingProps, SpacingProps, styled } from '@/services/theme';
import { WithMainRef } from '@/typings/components';

export type CheckboxProps = MuiCheckboxProps & SpacingProps & SizingProps & WithMainRef;

const { system, systemKeys } = composeSystem(spacing, sizing);

const StyledCheckbox = styled(MuiCheckbox, { omitKeys: systemKeys })<CheckboxProps>(system);

export const Checkbox = ({ mainRef, ...props }: CheckboxProps) => {
  return <StyledCheckbox {...props} ref={mainRef} />;
};
