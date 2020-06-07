import { FastField, Field, FieldValidator } from 'formik';
import React from 'react';

import { FC } from '@/typings/components';

export type FormikFieldProps = {
  name: string;
  validate?: FieldValidator;
  fast?: boolean;
};

export const FormikField: FC<FormikFieldProps> = ({ fast, children, ...restProps }) => {
  const FieldComponent = fast ? FastField : Field;

  return <FieldComponent {...restProps}>{children}</FieldComponent>;
};
