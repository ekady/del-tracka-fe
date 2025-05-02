import { Metadata } from 'next';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IPageParams } from '@/app/_common/types';
import AuthResetPasswordForm from '@/app/auth/reset-password/_components/AuthResetPasswordForm';

export const metadata: Metadata = {
  title: 'Reset Password',
};

const ResetPassword = async (props: IPageParams) => {
  const searchParams = await props.searchParams;
  const resetToken = searchParams?.token;
  if (!resetToken) throw new Error('No Token');

  const response = await serverFetch(`/authentication/verify-reset-token?token=${resetToken}`);
  const tokenValid = response.ok;

  return (
    <>
      <Typography component="div" variant="h6">
        RESET YOUR PASSWORD
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      {tokenValid && <AuthResetPasswordForm token={`${resetToken ?? ''}`} />}
    </>
  );
};

export default ResetPassword;
