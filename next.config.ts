/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/MatthewsWongOfficial/portofolio-images-bucket/**",
      },
    ],
  },

  // Disable ESLint & TypeScript errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // SEO Optimization
  reactStrictMode: true,
  trailingSlash: true, // Ensures consistent URLs
  generateEtags: false, // Improves caching

  // Open to all traffic (CORS & Security Headers)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" }, // Allow embedding
          { key: "X-Content-Type-Options", value: "nosniff" }, // Security
          { key: "Referrer-Policy", value: "no-referrer-when-downgrade" }, // SEO-friendly referrer policy
          { key: "Access-Control-Allow-Origin", value: "*" }, // Open CORS
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
        ],
      },
    ];
  },

  // Redirect `/sitemap.xml` to `/api/sitemap`
  async redirects() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
        permanent: true,
      },
    ];
  },

  // Improve performance & SEO
  experimental: {
    optimizeCss: true, // Optimizes CSS loading
    scrollRestoration: true, // Improves navigation UX
  },
};

module.exports = nextConfig;
