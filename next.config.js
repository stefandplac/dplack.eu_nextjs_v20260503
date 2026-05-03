/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  trailingSlash: true,
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
}

module.exports = nextConfig 