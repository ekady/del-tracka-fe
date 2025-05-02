import { Metadata } from 'next';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import AuthSignUpForm from '@/app/auth/sign-up/_components/AuthSignUpForm';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const AuthSignUpPage = () => {
  return (
    <>
      <Typography component="div" variant="h6">
        SIGN UP
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      <AuthSignUpForm />
    </>
  );
};

export default AuthSignUpPage;
