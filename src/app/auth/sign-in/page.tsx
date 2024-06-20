import { Metadata } from 'next';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import AuthSignInForm from './_components/AuthSignInForm';

export const metadata: Metadata = {
  title: 'Sign In',
};

const AuthSignInPage = () => {
  return (
    <>
      <Typography component="div" variant="h6">
        SIGN IN
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      <AuthSignInForm />
    </>
  );
};

export default AuthSignInPage;
