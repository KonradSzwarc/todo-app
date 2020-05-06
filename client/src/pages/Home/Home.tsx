import React from 'react';
import { useTranslation } from '@services/translation';

const Home = () => {
  const { t } = useTranslation('home');

  return <div className="App">{t('home')}</div>;
};

export default Home;
