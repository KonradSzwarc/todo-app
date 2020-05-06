import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from '@services/translation';

const About = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('about');

  return (
    <div>
      {t('about')}: {id}
    </div>
  );
};

export default About;
