import { ReactElement } from 'react';
import dynamic from 'next/dynamic';

import { LayoutAuth } from '@/common/layout';
import PageLoader from '@/common/base/PageLoader';

const AuthForgotPasswordPage = dynamic(() => import('@/features/auth/views/AuthForgotPasswordPage'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const ForgotPassword = () => <AuthForgotPasswordPage />;

ForgotPassword.getLayout = (page: ReactElement) => {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export const getServerSideProps = async () => {
  return {
    props: {
      title: 'Forgot Password',
    },
  };
};

export default ForgotPassword;
