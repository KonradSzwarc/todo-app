import { FieldProps, getIn } from 'formik';
import React from 'react';

import { TextField, TextFieldProps } from '@/components/atoms/TextField';

import { FormikField, FormikFieldProps } from '../Field';

export type FormikTextFieldProps = FormikFieldProps & TextFieldProps;

export const FormikTextField = React.forwardRef(
  (
    { name, validate, fast, onChange: $onChange, onBlur: $onBlur, ...restProps }: FormikTextFieldProps,
    ref: React.Ref<HTMLDivElement>,
  ) => (
    <FormikField name={name} validate={validate} fast={fast}>
      {({ field: { value, onChange, onBlur }, form: { touched, errors, isSubmitting } }: FieldProps) => {
        const errorText = getIn(errors, name);
        const error = getIn(touched, name) && Boolean(errorText);
        const helperText = error ? errorText : restProps.helperText;
        const disabled = restProps.disabled ?? isSubmitting;

        return (
          <TextField
            ref={ref}
            name={name}
            value={value}
            error={error}
            helperText={helperText}
            disabled={disabled}
            onChange={(event) => {
              onChange(event);
              if ($onChange) $onChange(event);
            }}
            onBlur={(event) => {
              onBlur(event);
              if ($onBlur) $onBlur(event);
            }}
            {...restProps}
          />
        );
      }}
    </FormikField>
  ),
);

FormikTextField.displayName = 'FormikTextField';
