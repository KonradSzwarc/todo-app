import { useFormikContext } from 'formik';
import React from 'react';

import { Button, ButtonProps } from '@/components/atoms/Button';

export type FormikSubmitButtonProps = Omit<ButtonProps, 'type'>;

const defaultProps: Partial<ButtonProps> = {
  variant: 'contained',
  type: 'submit',
  color: 'primary',
};

export const FormikSubmitButton = ({ children, ...props }: FormikSubmitButtonProps) => {
  const { isSubmitting } = useFormikContext();

  const disabled = isSubmitting || props.disabled;

  return (
    <Button {...props} disabled={disabled}>
      {children}
    </Button>
  );
};

FormikSubmitButton.defaultProps = defaultProps;
