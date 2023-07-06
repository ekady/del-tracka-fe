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
