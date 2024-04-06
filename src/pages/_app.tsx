// React
import type { ReactElement, ReactNode } from 'react';

// Next
import Head from 'next/head';
import { AppProps } from 'next/app';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

// Next Auth
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

// Utils
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../createEmotionCache';
import '@/styles/global.scss';

// Store
import { wrapper } from '@/common/store';

const ToastContainer = dynamic(() => import('react-toastify').then((comp) => comp.ToastContainer), { ssr: false });
const CssBaseline = dynamic(() => import('@mui/material/CssBaseline'), { ssr: false });
const LayoutTheme = dynamic(() => import('@/common/layout/LayoutTheme'), { ssr: false });
const RouteLoader = dynamic(() => import('@/common/base/RouteLoader'), { ssr: false });
const Custom500 = dynamic(() => import('./500'), { ssr: false });

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface IMyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

type TNextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type TAppPropsWithLayout = IMyAppProps & {
  Component: TNextPageWithLayout;
  session: Session;
};

export default function MyApp({ Component, ...restProps }: TAppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(restProps);
  const persistor = persistStore(store);

  const { emotionCache = clientSideEmotionCache, pageProps, session } = props as Partial<TAppPropsWithLayout>;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{pageProps?.title ? `${pageProps.title} | Tracka` : 'Tracka'}</title>
      </Head>
      <Provider store={store}>
        <LayoutTheme>
          <CssBaseline />
          <RouteLoader />
          <PersistGate persistor={persistor}>
            <SessionProvider session={session}>
              {pageProps.isError ? <Custom500 /> : getLayout(<Component {...pageProps} />)}
            </SessionProvider>
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
