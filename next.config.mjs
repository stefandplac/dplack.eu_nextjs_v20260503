/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
    unoptimized: true,
  },
  trailingSlash: true,
  output: "standalone",
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
};

export default nextConfig;

// Optional: for Wrangler bindings during `next dev`, add:
//   import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
//   void initOpenNextCloudflareForDev();
// (Avoid enabling during `next build` — it starts workerd/Miniflare and can fail in CI or Windows workers.)
