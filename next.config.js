/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'secure.gravatar.com', 'localhost'],
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
