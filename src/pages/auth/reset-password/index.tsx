import { ReactElement } from 'react';
import dynamic from 'next/dynamic';

import { verifyResetToken } from '@/features/auth/store/auth.api.slice';
import { wrapper } from '@/common/store';

import { LayoutAuth } from '@/common/layout';
import PageLoader from '@/common/base/PageLoader';
import { ResetPasswordProps } from '@/features/auth/views/AuthResetPasswordPage';

const AuthResetPasswordPage = dynamic(() => import('@/features/auth/views/AuthResetPasswordPage'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const ResetPassword = (props: ResetPasswordProps) => <AuthResetPasswordPage {...props} />;

ResetPassword.getLayout = (page: ReactElement) => {
  return <LayoutAuth noRedirect>{page}</LayoutAuth>;
};

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => async (context) => {
  const resetToken = context.query?.token as string;
  const data = await dispatch(verifyResetToken.initiate({ resetToken }));

  return {
    props: {
      tokenValid: data && 'data' in data,
      title: 'Reset Password',
    },
  };
});

export default ResetPassword;
