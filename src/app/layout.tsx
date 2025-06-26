import { ReactNode } from 'react';

import { Metadata } from 'next';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Analytics } from '@vercel/analytics/next';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/_common/utils/nextAuthOptions';

import NextAuthSessionProvider from './_common/base/NextAuthSessionProvider';
import RouteLoader from './_common/base/RouteLoader';
import ToastContainer from './_common/base/ToastContainer';
import LayoutTheme from './_common/layout/LayoutTheme';

import './global.css';

// Static metadata
export const metadata: Metadata = {
  title: { default: 'Tracka', template: '%s | Tracka' },
  openGraph: {
    title: 'Tracka - Bug Tracker Application',
    description:
      'Introducing the comprehensive bug tracker app designed to streamline your project management process and keep your team on track.',
    images: 'https://res.cloudinary.com/dwixtayvd/image/upload/v1712361636/tracka-meta.png',
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: [
      { url: '/images/icons/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/icons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/images/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/images/icons/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/images/icons/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/images/icons/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/images/icons/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/images/icons/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/images/icons/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/images/icons/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/images/icons/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/images/icons/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
};

interface IRootLayoutProps {
  children: ReactNode;
}

const RootLayout = async ({ children }: IRootLayoutProps) => {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <NextAuthSessionProvider session={session}>
            <LayoutTheme>
              <RouteLoader />
              <ToastContainer />
              {children}
            </LayoutTheme>
          </NextAuthSessionProvider>
        </AppRouterCacheProvider>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
