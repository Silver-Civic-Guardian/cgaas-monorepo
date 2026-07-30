import { useState, useEffect, useCallback } from 'react';
import { translations } from '../config/i18n';

const LANG_KEY = 'civic-guardian-lang';

export function useTranslation() {
  const [currentLang, setCurrentLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(LANG_KEY) || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === LANG_KEY) {
        setCurrentLang(event.newValue || 'en');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const changeLanguage = useCallback((lang) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANG_KEY, lang);
      window.dispatchEvent(new Event('languagechange'));
    }
    setCurrentLang(lang);
  }, []);

  useEffect(() => {
    const handleLocalChange = () => {
      if (typeof window !== 'undefined') {
        setCurrentLang(localStorage.getItem(LANG_KEY) || 'en');
      }
    };

    window.addEventListener('languagechange', handleLocalChange);
    return () => {
      window.removeEventListener('languagechange', handleLocalChange);
    };
  }, []);

  const t = useCallback((key) => {
    return translations[currentLang]?.[key] || translations['en']?.[key] || key;
  }, [currentLang]);

  return { t, currentLang, changeLanguage };
}
