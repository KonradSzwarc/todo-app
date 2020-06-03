import React from 'react';
import { Field, FastField, FieldValidator } from 'formik';
import { FC } from '@typings/components';

export type FormikFieldProps = {
  name: string;
  validate?: FieldValidator;
  fast?: boolean;
};

export const FormikField: FC<FormikFieldProps> = ({ fast, children, ...restProps }) => {
  const FieldComponent = fast ? FastField : Field;

  return <FieldComponent {...restProps}>{children}</FieldComponent>;
};
