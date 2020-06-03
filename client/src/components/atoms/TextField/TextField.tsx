import React from 'react';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField';
import { spacing, sizing } from '@material-ui/system';

import { composeSystem, styled, SpacingProps, SizingProps } from '@services/theme';
import { WithMainRef } from '@typings/components';

export type TextFieldProps = MuiTextFieldProps & Omit<SpacingProps, 'margin'> & SizingProps & WithMainRef;

const defaultProps: Partial<TextFieldProps> = {
  helperText: ' ',
  variant: 'outlined',
};

const { system, systemKeys } = composeSystem(spacing, sizing);

const StyledTextField = styled(MuiTextField, { omitKeys: systemKeys, preserveKeys: ['margin'] })(system);

export const TextField = ({ mainRef, ...props }: TextFieldProps) => {
  return <StyledTextField {...props} ref={mainRef} />;
};

TextField.defaultProps = defaultProps;
