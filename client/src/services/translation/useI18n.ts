import { useTranslation } from 'react-i18next';
import { Language } from './types';

export const useI18n = () => {
  const { i18n } = useTranslation();

  return {
    currentLanguage: i18n.languages[0] as Language,
  };
};
