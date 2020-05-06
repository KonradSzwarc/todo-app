import React from 'react';
import { useField, useFormikContext } from 'formik';
import { TextField as PureTextField, TextFieldProps as PureTextFieldProps } from '@components/atoms/TextField';

export type TextFieldProps = PureTextFieldProps & {
  name: string;
};

export const TextField = (props: TextFieldProps) => {
  const { isSubmitting } = useFormikContext();
  const [{ value, onChange, onBlur }, meta] = useField<string>(props.name);

  const handleChange: TextFieldProps['onChange'] = (e) => {
    if (props.onChange) {
      props.onChange(e);
    }

    onChange(e);
  };

  const handleBlur: TextFieldProps['onBlur'] = (e) => {
    if (props.onBlur) {
      props.onBlur(e);
    }

    onBlur(e);
  };

  const hasError = (!!meta.error && meta.touched) || props.error;
  const helperText = hasError ? meta.error : props.helperText;
  const disabled = isSubmitting || props.disabled;

  return (
    <PureTextField
      {...props}
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      error={hasError}
      helperText={helperText}
      defaultValue={meta.initialValue}
      disabled={disabled}
    />
  );
};
