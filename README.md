# D-PLACK CONSTRUCT - Next.js Website

A modern, responsive website for D-PLACK CONSTRUCT, a construction and rehabilitation company. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🌍 **Multi-language Support**: 7 languages (Spanish, English, French, German, Romanian, Greek, Italian)
- 📱 **Responsive Design**: Optimized for all devices
- ⚡ **Performance**: Built with Next.js for optimal performance
- 🔍 **SEO Optimized**: Meta tags, sitemap, robots.txt, and structured data
- 🎨 **Modern UI**: Clean, professional design with Tailwind CSS
- 📸 **Image Gallery**: Dynamic gallery with filtering by category
- 📞 **Contact Form**: Functional contact form with validation

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dplack.eu_nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
dplack.eu_nextjs/
├── app/                    # Next.js app directory
│   ├── [lang]/            # Language-specific routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── robots.ts          # Robots.txt
│   └── sitemap.ts         # Sitemap
├── src/
│   ├── components/        # React components
│   └── contexts/          # React contexts
├── public/                # Static assets
├── middleware.ts          # Next.js middleware
└── next.config.js         # Next.js configuration
```

## Internationalization

The website supports 7 languages with automatic language detection:

- Spanish (es) - Default
- English (en)
- French (fr)
- German (de)
- Romanian (ro)
- Greek (el)
- Italian (it)

Language switching is handled through URL routes:
- `/` - Spanish (default)
- `/en` - English
- `/fr` - French
- etc.

## SEO Features

- Meta tags for all pages
- Open Graph and Twitter Card support
- Structured data markup
- XML sitemap
- Robots.txt
- Hreflang tags for internationalization
- Canonical URLs

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The project can be deployed to any platform that supports Next.js:

```bash
npm run build
npm run start
```

## Customization

### Colors

The color scheme is defined in `tailwind.config.js`:

```javascript
colors: {
  'construction-blue': '#0F75BC',
  'construction-green': '#0f753c',
  'construction-orange': '#ff8080',
}
```

### Content

- Text content is managed through the `LanguageContext`
- Images are stored in `public/gallery/`
- Logo files are in `public/logo/`

## License

This project is private and proprietary to D-PLACK CONSTRUCT.

## Contact Form Setup

The contact form is fully functional and sends emails to `stefandplac@gmail.com`. To set up email functionality:

1. Follow the detailed guide in [EMAIL_SETUP.md](./EMAIL_SETUP.md)
2. Create a `.env.local` file with your email credentials
3. Test the form to ensure emails are being sent

### Quick Setup:
```bash
# Create environment file
cp env.example .env.local
# Edit .env.local with your email credentials
npm run dev
```

## Contact

For questions or support, contact D-PLACK CONSTRUCT at (0034)-647-857-388.
