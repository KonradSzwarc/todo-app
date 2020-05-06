import { Form as FormikForm, FormikFormProps } from 'formik';
import { styled, SpacingProps, DisplayProps, FlexboxProps, composeSystem } from '@services/theme';
import { spacing, display, flexbox } from '@material-ui/system';

export type FormProps = FormikFormProps & SpacingProps & DisplayProps & FlexboxProps;

const { system, systemKeys } = composeSystem(spacing, display, flexbox);

export const Form = styled(FormikForm, { omitKeys: systemKeys })(system);
