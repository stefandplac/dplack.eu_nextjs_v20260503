'use client'

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SUPPORTED_LANGUAGES } from "@/contexts/LanguageContext";

interface PageProps {
  params: {
    lang: string;
  };
}

export default function LanguagePage({ params }: PageProps) {
  const { setLanguage } = useLanguage();
  const { lang } = params;

  // Set language based on URL parameter
  React.useEffect(() => {
    if (SUPPORTED_LANGUAGES[lang as keyof typeof SUPPORTED_LANGUAGES]) {
      setLanguage(lang as keyof typeof SUPPORTED_LANGUAGES);
    }
  }, [lang, setLanguage]);

  // Redirect to root if Spanish is selected
  React.useEffect(() => {
    if (lang === 'es') {
      window.location.href = '/';
    }
  }, [lang]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <Hero />
      <Services />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
} 