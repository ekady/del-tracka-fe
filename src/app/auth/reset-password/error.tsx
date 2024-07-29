'use client';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import AuthResetInvalid from '@/app/auth/reset-password/_components/AuthResetInvalid';

const ErrorResetPassword = () => {
  return (
    <>
      <Typography component="div" variant="h6">
        RESET YOUR PASSWORD
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      <AuthResetInvalid />
    </>
  );
};

export default ErrorResetPassword;
