import { display, flexbox, spacing } from '@material-ui/system';
import { Form as FormikForm, FormikFormProps } from 'formik';

import { composeSystem, DisplayProps, FlexboxProps, SpacingProps, styled } from '@/services/theme';

export type FormProps = FormikFormProps & SpacingProps & DisplayProps & FlexboxProps;

const { system, systemKeys } = composeSystem(spacing, display, flexbox);

export const Form = styled(FormikForm, { omitKeys: systemKeys })(system);
