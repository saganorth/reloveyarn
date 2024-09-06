/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: [],  // List of domains images are hosted on (not needed for local images)
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96],
    path: '/_next/image',
    loader: 'default'
  }
};

module.exports = nextConfig
