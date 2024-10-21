const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['localhost'], 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '3000',
        pathname: '/img/**',
      }
    ],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    path: '/_next/image',
    loader: 'default'
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Use the existing aliases in the config plus add your own
    config.resolve.alias['@'] = path.resolve(__dirname, './');
    return config;
  },
};

module.exports = nextConfig;
