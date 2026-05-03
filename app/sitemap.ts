import { MetadataRoute } from 'next'

const SUPPORTED_LANGUAGES = ['es', 'en', 'fr', 'de', 'ro', 'el', 'it']

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dplack.eu'
  
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ]

  // Add language-specific routes
  SUPPORTED_LANGUAGES.forEach((lang) => {
    if (lang !== 'es') {
      routes.push({
        url: `${baseUrl}/${lang}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      })
    }
  })

  return routes
} 