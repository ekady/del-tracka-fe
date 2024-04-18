import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { GetServerSidePropsContext } from 'next';

import { getSession } from 'next-auth/react';

import { LayoutAuth } from '@/common/layout';
import PageLoader from '@/common/base/PageLoader';

const AuthSignInPage = dynamic(() => import('@/features/auth/views/AuthSignInPage'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const SignIn = () => <AuthSignInPage />;

SignIn.getLayout = (page: ReactElement) => {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession({ req: context.req });
  if (session?.user?.userToken) {
    return {
      redirect: {
        permanent: false,
        destination: '/app/dashboard',
      },
    };
  }

  return {
    props: {
      title: 'Sign In',
    },
  };
};

export default SignIn;
