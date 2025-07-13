'use client'

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-construction-blue rounded-full"></div>
        <div className="absolute top-32 right-10 w-16 h-16 bg-construction-green rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-construction-orange rounded-full"></div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          <span className="text-construction-blue">{t('heroTitle1')}</span>
          <br />
          <span className="text-construction-green">{t('heroTitle2')}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          {t('heroSubtitle')}
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <svg className="w-5 h-5 text-construction-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{t('featureSeguridad')}</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <svg className="w-5 h-5 text-construction-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{t('featureCalidad')}</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <svg className="w-5 h-5 text-construction-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{t('featureEco')}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-8 py-3 bg-construction-blue text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {t('ctaPresupuesto')}
          </a>
          <a 
            href="#services" 
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-construction-blue text-construction-blue font-semibold rounded-full hover:bg-construction-blue hover:text-white transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('ctaVerServicios')}
          </a>
        </div>

        {/* Phone Number */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">{t('helpText')}</p>
          <a href="tel:+34647857388" className="text-construction-blue font-semibold text-lg hover:underline">
            {t('phone')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero; 