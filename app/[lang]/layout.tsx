import type { Metadata } from 'next'
import { SUPPORTED_LANGUAGES } from '@/contexts/LanguageContext'
import Script from 'next/script'

interface LayoutProps {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { lang } = params;
  const language = SUPPORTED_LANGUAGES[lang as keyof typeof SUPPORTED_LANGUAGES];
  
  if (!language) {
    return {
      title: 'D-PLACK CONSTRUCT - Construction & Rehabilitation',
    };
  }

  const localeMap: Record<string, string> = {
    'es': 'es_ES',
    'en': 'en_US',
    'fr': 'fr_FR',
    'de': 'de_DE',
    'ro': 'ro_RO',
    'el': 'el_GR',
    'it': 'it_IT'
  };

  // Language-specific content
  const languageContent = {
    es: {
      title: 'D-PLACK CONSTRUCT - Construcción y Rehabilitación Profesional | Calidad Garantizada',
      description: 'D-PLACK CONSTRUCT: Especialistas en construcción, demolición, pintura, pavimentos, aislamiento e instalaciones eléctricas y térmicas.',
      keywords: 'construcción, demolición, rehabilitación, pintura, pavimentos, aislamiento, instalaciones eléctricas, instalaciones térmicas, España, Madrid, Barcelona, Valencia'
    },
    en: {
      title: 'D-PLACK CONSTRUCT - Professional Construction & Rehabilitation Services | Quality Guaranteed',
      description: 'D-PLACK CONSTRUCT: Specialists in construction, demolition, painting, flooring, insulation and electrical and thermal installations.',
      keywords: 'construction, demolition, rehabilitation, painting, flooring, insulation, electrical installations, thermal installations, Spain, Madrid, Barcelona, Valencia'
    },
    fr: {
      title: 'D-PLACK CONSTRUCT - Services de Construction et Réhabilitation Professionnels | Qualité Garantie',
      description: 'D-PLACK CONSTRUCT: Spécialistes en construction, démolition, peinture, revêtements de sol, isolation et installations électriques et thermiques.',
      keywords: 'construction, démolition, réhabilitation, peinture, revêtements de sol, isolation, installations électriques, installations thermiques, Espagne, Madrid, Barcelone, Valence'
    },
    de: {
      title: 'D-PLACK CONSTRUCT - Professionelle Bau- und Sanierungsdienstleistungen | Qualität garantiert',
      description: 'D-PLACK CONSTRUCT: Spezialisten für Bau, Abbruch, Malerei, Bodenbeläge, Dämmung sowie elektrische und thermische Installationen.',
      keywords: 'Bau, Abbruch, Sanierung, Malerei, Bodenbeläge, Dämmung, Elektroinstallationen, Heizungsinstallationen, Spanien, Madrid, Barcelona, Valencia'
    },
    ro: {
      title: 'D-PLACK CONSTRUCT - Servicii Profesionale de Construcții și Reabilitare | Calitate Garantată',
      description: 'D-PLACK CONSTRUCT: Specialiști în construcții, demolare, vopsire, pardoseli, izolare și instalatii electrice și termice.',
      keywords: 'construcții, demolare, reabilitare, vopsire, pardoseli, izolare, instalatii electrice, instalatii termice, Spania, Madrid, Barcelona, Valencia'
    },
    el: {
      title: 'D-PLACK CONSTRUCT - Επαγγελματικές Υπηρεσίες Κατασκευής και Αποκατάστασης | Εγγυημένη Ποιότητα',
      description: 'D-PLACK CONSTRUCT: Ειδικοί σε κατασκευές, κατεδάφιση, βαφή, δάπεδα, μόνωση και ηλεκτρικές και θερμικές εγκαταστάσεις.',
      keywords: 'κατασκευές, κατεδάφιση, αποκατάσταση, βαφή, δάπεδα, μόνωση, ηλεκτρικές εγκαταστάσεις, θερμικές εγκαταστάσεις, Ισπανία, Μαδρίτη, Βαρκελώνη, Βαλένθια'
    },
    it: {
      title: 'D-PLACK CONSTRUCT - Servizi Professionali di Costruzione e Riqualificazione | Qualità Garantita',
      description: 'D-PLACK CONSTRUCT: Specialisti in costruzioni, demolizioni, pittura, pavimentazioni, isolamento e installazioni elettriche e termiche.',
      keywords: 'costruzioni, demolizioni, riqualificazione, pittura, pavimentazioni, isolamento, installazioni elettriche, installazioni termiche, Spagna, Madrid, Barcellona, Valencia'
    }
  };

  const content = languageContent[lang as keyof typeof languageContent] || languageContent.es;

  const canonicalPath = lang === 'es' ? 'https://dplack.eu/' : `https://dplack.eu/${lang}/`;

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,
    alternates: {
      canonical: canonicalPath,
      languages: {
        'es': 'https://dplack.eu/',
        'en': 'https://dplack.eu/en',
        'fr': 'https://dplack.eu/fr',
        'de': 'https://dplack.eu/de',
        'ro': 'https://dplack.eu/ro',
        'el': 'https://dplack.eu/el',
        'it': 'https://dplack.eu/it',
      },
    },
    openGraph: {
      title: content.title,
      description: content.description,
      locale: localeMap[lang] || 'es_ES',
      type: 'website',
      url: canonicalPath.replace(/\/$/, '') || 'https://dplack.eu',
      siteName: 'D-PLACK CONSTRUCT',
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

const getStructuredData = (lang: string) => {
  const languageNames = {
    es: 'Español',
    en: 'English',
    fr: 'Français',
    de: 'Deutsch',
    ro: 'Română',
    el: 'Ελληνικά',
    it: 'Italiano'
  };

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "D-PLACK CONSTRUCT",
    "description": "Especialistas en construcción, demolición, pintura, pavimentos, aislamiento e instalaciones eléctricas y térmicas",
    "url": `https://dplack.eu/${lang === 'es' ? '' : lang}`,
    "telephone": "+34647857388",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ES",
      "addressRegion": "España"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.4168",
      "longitude": "-3.7038"
    },
    "openingHours": "Mo-Fr 08:00-18:00",
    "priceRange": "€€",
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "areaServed": "España",
    "serviceArea": {
      "@type": "Country",
      "name": "España"
    },
    "inLanguage": languageNames[lang as keyof typeof languageNames] || "Español",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Construcción",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Construcción y Demolición",
            "description": "Demoliciones, yeso, azulejos, estructuras metálicas, cimientos y más"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pintura y Acabados",
            "description": "Paredes, azulejos, papel pintado, pintura interior y exterior"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pavimentos",
            "description": "Hormigón, refuerzo, arenisca, granito, mármol, parquet y más"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Aislamiento",
            "description": "Pladur, estructura metálica, aislamiento y falsos techos"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Instalaciones Eléctricas",
            "description": "Iluminación, enchufes, interruptores, proyectores y más"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Instalaciones Térmicas",
            "description": "Calefacción, radiadores, calderas, hidróforos y sistemas centrales"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    },
    "sameAs": [
      "https://dplack.eu"
    ]
  };
};

export default function LanguageLayout({ children, params }: LayoutProps) {
  const { lang } = params;
  
  return (
    <>
      <Script
        id={`structured-data-${lang}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData(lang)) }}
      />
      {children}
    </>
  );
} 