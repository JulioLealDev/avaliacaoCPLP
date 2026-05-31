import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext({ lang: 'pt', setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('pt');
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
