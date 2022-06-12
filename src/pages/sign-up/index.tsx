// React
import { ReactElement } from 'react';

// Components
import { LayoutAuth } from '@/common/layout';
import AuthSignUpUI from '@/features/Auth/components/AuthSignUpUI';

const SignUp = () => {
  return <AuthSignUpUI />;
};

SignUp.getLayout = (page: ReactElement) => {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export default SignUp;
