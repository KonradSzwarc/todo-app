import React from 'react';
import { Formik, FormikConfig } from 'formik';

import { Form } from '@components/formik/Form';
import { TextField } from '@components/formik/TextField';
import { SubmitButton } from '@components/formik/SubmitButton';
import { useValidation } from '@services/validation/useValidation';
import { YupSchema } from '@services/validation';
import { Box } from '@components/atoms/Box';
import { useSignInTranslations } from './SignIn.translations';

type FormValues = {
  email: string;
  password: string;
};

const SignInComponent = () => {
  const { t } = useSignInTranslations();

  return (
    <Box width="100vw" height="calc(100vh - 64px)" display="flex" justifyContent="center" alignItems="center">
      <Form display="flex" flexDirection="column">
        <TextField name="email" label={t('emailLabel')} autoFocus />
        <TextField name="password" label={t('passwordLabel')} />
        <SubmitButton>{t('submitText')}</SubmitButton>
      </Form>
    </Box>
  );
};

const SignInContainer = () => {
  const { yup } = useValidation();

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const validationSchema: YupSchema<FormValues> = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

  const handleSubmit: FormikConfig<FormValues>['onSubmit'] = (values, helpers) => {
    console.log(values);

    setTimeout(() => {
      helpers.setSubmitting(false);
    }, 2000);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <SignInComponent />
    </Formik>
  );
};

const SignIn = SignInContainer;

export default SignIn;
