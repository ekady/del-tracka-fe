// React
import { ReactElement } from 'react';

// Components
import { LayoutAuth } from '../../common/layout';
import AuthSignUpUI from '../../features/Auth/ui/AuthSignUpUI';

const SignUp = () => {
  return <AuthSignUpUI />;
};

SignUp.getLayout = (page: ReactElement) => {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export default SignUp;
