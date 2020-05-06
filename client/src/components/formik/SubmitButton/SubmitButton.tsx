import React from 'react';
import { Button, ButtonProps } from '@components/atoms/Button';
import { useFormikContext } from 'formik';

export type SubmitButtonProps = Omit<ButtonProps, 'type'>;

const defaultProps: Partial<ButtonProps> = {
  variant: 'contained',
  type: 'submit',
  color: 'primary',
};

export const SubmitButton = ({ children, ...props }: SubmitButtonProps) => {
  const { isSubmitting } = useFormikContext();

  const disabled = isSubmitting || props.disabled;

  return (
    <Button {...props} disabled={disabled}>
      {children}
    </Button>
  );
};

SubmitButton.defaultProps = defaultProps;
