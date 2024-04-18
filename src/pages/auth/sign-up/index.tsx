import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { GetServerSidePropsContext } from 'next';

import { getSession } from 'next-auth/react';

import { LayoutAuth } from '@/common/layout';
import PageLoader from '@/common/base/PageLoader';

const AuthSignUpPage = dynamic(() => import('@/features/auth/views/AuthSignUpPage'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const SignUp = () => <AuthSignUpPage />;

SignUp.getLayout = (page: ReactElement) => {
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
      title: 'Sign Up',
    },
  };
};

export default SignUp;
