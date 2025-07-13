'use client'

import React from 'react';
import Link from 'next/link';
import { useLanguage, SUPPORTED_LANGUAGES } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, supportedLanguages } = useLanguage();

  const currentLanguage = supportedLanguages[language];

  const changeLanguage = (languageCode: keyof typeof SUPPORTED_LANGUAGES) => {
    setLanguage(languageCode);
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium text-gray-700">{language.toUpperCase()}</span>
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {Object.entries(supportedLanguages).map(([code, lang]) => (
          code === 'es' ? (
            <button
              key={code}
              onClick={() => {
                changeLanguage(code as keyof typeof SUPPORTED_LANGUAGES);
                // Force a page reload to ensure the language change takes effect
                window.location.href = '/';
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                language === code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </button>
          ) : (
            <Link
              key={code}
              href={`/${code}`}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                language === code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </Link>
          )
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher; 