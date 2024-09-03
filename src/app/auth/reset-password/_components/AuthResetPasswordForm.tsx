'use client';

// React
import { BaseSyntheticEvent, useState } from 'react';

// Next Components

// React Hook Form

// MUI Components
import Link from 'next/link';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import LinkMui from '@mui/material/Link';
import { useForm } from 'react-hook-form';

import { IResponseMessage, responseMessage } from '@/app/_common/constants/responseMessage.constant';
import { IResetPasswordForm } from '@/app/auth/_interfaces';
import { actionResetPassword } from '@/app/auth/reset-password/_actions/resetPassword.action';
import AuthResetInvalid from '@/app/auth/reset-password/_components/AuthResetInvalid';
import AuthResetPasswordFormContent from '@/app/auth/reset-password/_components/AuthResetPasswordFormContent';
import { passwordValidator } from '@/app/auth/sign-up/_helper/passwordConfirm';

const AuthResetPasswordForm = ({ token }: { token?: string }) => {
  const { handleSubmit, ...formState } = useForm<IResetPasswordForm>({ mode: 'onSubmit' });
  const [loading, setLoading] = useState(false);
  const [requestState, setRequestState] = useState<IResponseMessage>({ ...responseMessage });

  const passwordValue = formState.watch('password');
  const passwordValidation = passwordValidator(passwordValue ?? '');

  const onSubmit = handleSubmit(async (payload) => {
    setLoading(true);
    try {
      if (!passwordValidation.isAllTrue) return;
      const response = await actionResetPassword(token ?? '', payload);
      setRequestState(response);

      if (response.isSuccess) formState.reset();
    } finally {
      setLoading(false);
    }
  }) as (e?: BaseSyntheticEvent) => void;

  if (requestState.isError) return <AuthResetInvalid />;

  return (
    <>
      {requestState.isSuccess && (
        <Alert severity="success">
          Your password successfully reseted! Back to{' '}
          <Link href="/auth/sign-in">
            <LinkMui>Sign In</LinkMui>
          </Link>
        </Alert>
      )}
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
        <AuthResetPasswordFormContent {...formState} loading={loading} />
      </Box>
    </>
  );
};

export default AuthResetPasswordForm;
