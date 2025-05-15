import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from '../i18n';

type Language = 'en' | 'uk';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage first
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'en' || savedLanguage === 'uk') {
      return savedLanguage as Language;
    }
    // If no saved language, get from i18n or default to English
    const currentLng = i18n.language;
    if (currentLng === 'uk') {
      return 'uk';
    }
    return 'en';
  });

  useEffect(() => {
    // Update localStorage
    localStorage.setItem('language', language);
    
    // Update i18n language
    i18n.changeLanguage(language);
  }, [language]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 