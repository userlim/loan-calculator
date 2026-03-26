/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  optimizeFonts: true,
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp']
  }
};

module.exports = nextConfig;
