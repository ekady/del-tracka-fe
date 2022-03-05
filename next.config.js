/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles')],
  },
};

module.exports = nextConfig;
