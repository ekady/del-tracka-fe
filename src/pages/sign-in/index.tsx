// react
import { ReactElement } from 'react';

// Components
import { LayoutAuth } from '@/common/layout';
import AuthLoginUI from '@/features/Auth/components/AuthLoginUI';

const SignIn = () => {
  return <AuthLoginUI />;
};

SignIn.getLayout = (page: ReactElement) => {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export default SignIn;
