'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { t, language, setLanguage, supportedLanguages } = useLanguage();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const currentLanguage = supportedLanguages[language];

  const changeLanguage = (languageCode: keyof typeof supportedLanguages) => {
    setLanguage(languageCode);
    setIsLanguageDropdownOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    if (isLanguageDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageDropdownOpen]);

  return (
    <header 
      className="bg-white shadow-lg sticky top-0 z-50 w-full sticky-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        backgroundColor: 'white'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex w-12 h-12 items-center justify-center">
              <img 
                src="/logo/mainlogo.jpg" 
                alt="D-PLACK Logo" 
                className="w-full h-full object-contain" 
                draggable="false"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-construction-blue">D-PLACK</h1>
              <p className="text-xs text-gray-500">{t('companySlogan')}</p>
            </div>
          </div>

          {/* Phone Number - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <svg className="w-5 h-5 text-construction-blue" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <a href="tel:+34647857388" className="text-construction-blue font-semibold hover:text-construction-green transition-colors">
              {t('phone')}
            </a>
          </div>

          {/* Mobile Right Side - Phone + Language Icon */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Phone Number - Mobile (Permanent) */}
            <div className="flex items-center space-x-3 bg-construction-blue rounded-full px-4 py-2 shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <a href="tel:+34647857388" className="text-white font-bold text-base hover:text-gray-100 transition-colors">
                {t('phone')}
              </a>
            </div>

            {/* Mobile Language Icon */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={toggleLanguageDropdown}
                className="flex items-center justify-center w-10 h-10 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200 transition-colors"
              >
                <span className="text-lg">{currentLanguage.flag}</span>
              </button>
              
              {isLanguageDropdownOpen && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 bg-black bg-opacity-25 z-40"
                    onClick={() => setIsLanguageDropdownOpen(false)}
                  />
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                    {Object.entries(supportedLanguages).map(([code, lang]) => (
                      code === 'es' ? (
                        <button
                          key={code}
                          onClick={() => {
                            changeLanguage(code as keyof typeof supportedLanguages);
                            // Force a page reload to ensure the language change takes effect
                            window.location.href = '/';
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                            language === code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                          }`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span className="text-sm font-medium">{code.toUpperCase()}</span>
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
                          <span className="text-sm font-medium">{code.toUpperCase()}</span>
                        </Link>
                      )
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-gray-700 hover:text-construction-blue transition-colors"
            >
              {t('navEmpresa')}
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-construction-blue transition-colors"
            >
              {t('navServicios')}
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="text-gray-700 hover:text-construction-blue transition-colors"
            >
              {t('navGaleria')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-construction-blue transition-colors"
            >
              {t('navContacto')}
            </button>
            <LanguageSwitcher />
          </nav>


        </div>


      </div>
    </header>
  );
};

export default Header; 