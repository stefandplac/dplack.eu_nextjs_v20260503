import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'D-PLACK CONSTRUCT - Construcción y Rehabilitación Profesional | Calidad Garantizada',
  description: 'D-PLACK CONSTRUCT: Especialistas en construcción, demolición, pintura, pavimentos, aislamiento e instalaciones eléctricas y térmicas. Calidad, profesionalidad y satisfacción del cliente son nuestros principios fundamentales.',
  keywords: 'construcción, demolición, rehabilitación, pintura, pavimentos, aislamiento, instalaciones eléctricas, instalaciones térmicas, yeso, azulejos, estructuras metálicas, cimientos, España, Madrid, Barcelona, Valencia',
  authors: [{ name: 'D-PLACK CONSTRUCT' }],
  creator: 'D-PLACK CONSTRUCT',
  publisher: 'D-PLACK CONSTRUCT',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dplack.eu'),
  alternates: {
    canonical: '/',
    languages: {
      'es': '/',
      'en': '/en',
      'fr': '/fr',
      'de': '/de',
      'ro': '/ro',
      'el': '/el',
      'it': '/it',
    },
  },
  openGraph: {
    title: 'D-PLACK CONSTRUCT - Construcción y Rehabilitación Profesional | Calidad Garantizada',
    description: 'D-PLACK CONSTRUCT: Especialistas en construcción, demolición, pintura, pavimentos, aislamiento e instalaciones eléctricas y térmicas.',
    url: 'https://dplack.eu',
    siteName: 'D-PLACK CONSTRUCT',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/logo/mainlogo.jpg',
        width: 1200,
        height: 630,
        alt: 'D-PLACK CONSTRUCT Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'D-PLACK CONSTRUCT - Construcción y Rehabilitación Profesional | Calidad Garantizada',
    description: 'D-PLACK CONSTRUCT: Especialistas en construcción, demolición, pintura, pavimentos, aislamiento e instalaciones eléctricas y térmicas.',
    images: ['/logo/mainlogo.jpg'],
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
  verification: {
    google: 'googlef9314972a3d9086d',
  },
  category: 'construction',
  classification: 'business',
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "D-PLACK CONSTRUCT",
  "description": "Especialistas en construcción, demolición, pintura, pavimentos, aislamiento e instalaciones eléctricas y térmicas",
  "url": "https://dplack.eu",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
} 