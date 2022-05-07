// react
import { ReactElement } from 'react';

// Components
import { LayoutAuth } from '../../common/layout';
import AuthLoginUI from '../../modules/Auth/ui/AuthLoginUI';

export default function SignIn() {
  return <AuthLoginUI />;
}

SignIn.getLayout = (page: ReactElement) => {
  return <LayoutAuth>{page}</LayoutAuth>;
};
