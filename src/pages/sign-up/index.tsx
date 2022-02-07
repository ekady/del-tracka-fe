// React
import { ReactElement } from 'react';

// Components
import { LayoutAuth } from '../../common/components/layout';
import AuthSignUpUI from '../../modules/Auth/ui/AuthSignUpUI';

export default function SignUp() {
  return <AuthSignUpUI />;
}

SignUp.getLayout = (page: ReactElement) => {
  return <LayoutAuth>{page}</LayoutAuth>;
};
