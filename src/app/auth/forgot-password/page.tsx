import { Metadata } from 'next';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import AuthForgotPasswordForm from '@/app/auth/forgot-password/_components/AuthForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Forgot Password',
};

const AuthForgotPassword = () => {
  return (
    <>
      <Typography component="div" variant="h6">
        Forgot Password
      </Typography>
      <Typography variant="caption" sx={{ mt: 1 }}>
        Please enter your email so we can send instruction for reset password to your email
      </Typography>

      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      <AuthForgotPasswordForm />
    </>
  );
};

export default AuthForgotPassword;
