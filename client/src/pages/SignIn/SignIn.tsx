import React from 'react';
import { Formik, FormikConfig } from 'formik';

import { Form } from '@components/formik/Form';
import { FormikTextField } from '@components/formik/TextField';
import { FormikSubmitButton } from '@components/formik/SubmitButton';
import { useValidation } from '@services/validation/useValidation';
import { YupSchema } from '@services/validation';
import { Box } from '@components/atoms/Box';
import { useCurrentUserActions } from '@store/currentUser';

import { useSignInTranslations } from './SignIn.translations';

type FormValues = {
  email: string;
  password: string;
};

const TEXT_FIELD_WIDTH = 320;

const SignInComponent = () => {
  const { t } = useSignInTranslations();

  return (
    <Box width="100vw" height="calc(100vh - 64px)" display="flex" justifyContent="center" alignItems="center">
      <Form display="flex" flexDirection="column">
        <FormikTextField name="email" label={t('emailLabel')} autoFocus width={TEXT_FIELD_WIDTH} mb={2} />
        <FormikTextField name="password" label={t('passwordLabel')} width={TEXT_FIELD_WIDTH} mb={2} />
        <FormikSubmitButton>{t('submitText')}</FormikSubmitButton>
      </Form>
    </Box>
  );
};

const SignInContainer = () => {
  const { yup } = useValidation();
  const { signIn } = useCurrentUserActions();

  const initialValues: FormValues = {
    email: 'Hayden_Zemlak49@hotmail.com',
    password: '12345678',
  };

  const validationSchema: YupSchema<FormValues> = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

  const handleSubmit: FormikConfig<FormValues>['onSubmit'] = (values, helpers) => {
    signIn(values);
    helpers.setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <SignInComponent />
    </Formik>
  );
};

const SignIn = SignInContainer;

export default SignIn;
