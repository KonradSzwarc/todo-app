import React from 'react';
import { useTranslation } from '@services/translation';

const Contact = () => {
  const { t } = useTranslation('contact');

  return <div>{t('contact')}</div>;
};

export default Contact;
