/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'secure.gravatar.com' },
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'localhost' },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles')],
  },
  async redirects() {
    return [
      {
        source: '/app',
        destination: '/app/dashboard',
        permanent: true,
      },
      {
        source: '/auth',
        destination: '/auth/sign-in',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
