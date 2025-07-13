import { NextRequest, NextResponse } from 'next/server'

const SUPPORTED_LANGUAGES = ['es', 'en', 'fr', 'de', 'ro', 'el', 'it']

// Country code to language mapping for IP-based detection
const COUNTRY_TO_LANGUAGE: Record<string, string> = {
  'US': 'en', 'GB': 'en', 'AU': 'en',
  'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es',
  'FR': 'fr', 'BE': 'fr',
  'DE': 'de', 'AT': 'de', 'LI': 'de',
  'RO': 'ro', 'MD': 'ro',
  'GR': 'el', 'CY': 'el',
  'IT': 'it', 'SM': 'it', 'VA': 'it',
  'CA': 'en', // Canada - English is more common
  'CH': 'de'  // Switzerland - German is most common
};

// Function to detect language from Accept-Language header
function detectLanguageFromHeader(acceptLanguage: string): string {
  if (!acceptLanguage) return 'es';

  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [language, quality = '1'] = lang.trim().split(';q=')
      return {
        language: language.split('-')[0].toLowerCase(),
        quality: parseFloat(quality)
      }
    })
    .sort((a, b) => b.quality - a.quality)

  // Find the first supported language
  for (const { language } of languages) {
    if (SUPPORTED_LANGUAGES.includes(language)) {
      return language;
    }
  }

  return 'es'; // Default to Spanish
}

// Function to detect language from IP country
async function detectLanguageFromIP(request: NextRequest): Promise<string> {
  try {
    // Get country from Cloudflare headers (if available)
    const country = request.headers.get('cf-ipcountry') || 
                   request.headers.get('x-vercel-ip-country');
    
    if (country && COUNTRY_TO_LANGUAGE[country]) {
      return COUNTRY_TO_LANGUAGE[country];
    }

    // Fallback: try to get country from IP using external service
    const ip = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0];
    if (ip) {
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await response.json();
      const countryCode = data.country_code;
      return COUNTRY_TO_LANGUAGE[countryCode] || 'es';
    }
  } catch (error) {
    console.warn('Could not detect country from IP:', error);
  }

  return 'es';
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml') ||
    pathname.includes('.')
  ) {
    return
  }
  
  // Check if the pathname starts with a supported language
  const pathnameHasLanguage = SUPPORTED_LANGUAGES.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  )

  if (pathnameHasLanguage) return

  // If it's the root path, detect language and redirect
  if (pathname === '/') {
    // Check for stored language preference in cookies
    const storedLanguage = request.cookies.get('preferred-language')?.value;
    
    if (storedLanguage && SUPPORTED_LANGUAGES.includes(storedLanguage)) {
      // User has a stored preference
      if (storedLanguage === 'es') {
        // For Spanish, stay on root path but set the cookie
        const response = NextResponse.next();
        response.cookies.set('preferred-language', 'es', {
          maxAge: 60 * 60 * 24 * 365, // 1 year
          path: '/',
          httpOnly: false, // Allow JavaScript access
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });
        return response;
      } else {
        // Redirect to stored language
        const response = NextResponse.redirect(new URL(`/${storedLanguage}`, request.url));
        return response;
      }
    }

    // Detect language from browser preferences
    const acceptLanguage = request.headers.get('accept-language') || '';
    const detectedLanguage = detectLanguageFromHeader(acceptLanguage);
    
    // If Spanish is detected, stay on root path
    if (detectedLanguage === 'es') {
      const response = NextResponse.next();
      response.cookies.set('preferred-language', 'es', {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: '/',
        httpOnly: false, // Allow JavaScript access
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });
      return response;
    }

    // Redirect to detected language
    const response = NextResponse.redirect(new URL(`/${detectedLanguage}`, request.url));
    
    // Set cookie to remember the detected language
    response.cookies.set('preferred-language', detectedLanguage, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
      httpOnly: false, // Allow JavaScript access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    
    return response;
  }

  // For any other path, redirect to Spanish (default)
  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 