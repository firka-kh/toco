import { useTranslation } from 'react-i18next';

export const useLocale = () => {
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language as 'taj' | 'rus';

  const changeLanguage = (lang: 'taj' | 'rus') => {
    i18n.changeLanguage(lang);
  };

  const getLocalizedText = (text: { taj: string; rus: string }) => {
    return text[currentLang] || text.rus;
  };

  return {
    t,
    currentLang,
    changeLanguage,
    getLocalizedText,
    isRTL: currentLang === 'taj',
  };
};

export default useLocale;
