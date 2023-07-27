// React
import * as React from 'react';
import type { ReactElement, ReactNode } from 'react';

// Next Components
import Head from 'next/head';
import { AppProps } from 'next/app';
import type { NextPage } from 'next';

// Next Auth
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

// React redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Utils
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../createEmotionCache';
import '@/styles/global.scss';

// Store
import store, { persistor } from '@/common/store';

// Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Charts
import 'chart.js/auto';
import { LayoutTheme } from '@/common/layout';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = MyAppProps & {
  Component: NextPageWithLayout;
  session: Session;
};

export default function MyApp(props: AppPropsWithLayout) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, session } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="apple-touch-icon" sizes="57x57" href="/images/icons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/images/icons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/images/icons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/images/icons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/images/icons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/images/icons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/images/icons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/images/icons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/icons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/icons/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/images/icons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/icons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/images/icons/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <title>Tracka</title>
      </Head>
      <Provider store={store}>
        <LayoutTheme>
          <CssBaseline />
          <PersistGate persistor={persistor}>
            <SessionProvider session={session}>{getLayout(<Component {...pageProps} />)}</SessionProvider>
          </PersistGate>
          <ToastContainer
            position="top-center"
            autoClose={8000}
            newestOnTop
            closeOnClick
            closeButton={false}
            pauseOnFocusLoss={false}
            theme="colored"
          />
        </LayoutTheme>
      </Provider>
    </CacheProvider>
  );
}
