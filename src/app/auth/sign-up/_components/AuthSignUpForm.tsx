'use client';

// React
import { BaseSyntheticEvent, useState } from 'react';

import Link from 'next/link';

import { LoadingButton } from '@mui/lab';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { IResponseMessage, responseMessage } from '@/app/_common/constants/responseMessage.constant';
import { ISignUpRequest } from '@/app/auth/_interfaces';
import { actionSignUp } from '@/app/auth/sign-up/_actions/signUp.action';
import AuthSignUpActions from '@/app/auth/sign-up/_components/AuthSignUpActions';
import AuthSignUpFormContent from '@/app/auth/sign-up/_components/AuthSignUpFormContent';
import { passwordValidator } from '@/app/auth/sign-up/_helper/passwordConfirm';

const AuthSignUpForm = () => {
  const { handleSubmit, ...formState } = useForm<ISignUpRequest>({ mode: 'onSubmit' });
  const [requestState, setRequestState] = useState<IResponseMessage>({ ...responseMessage });
  const [loading, setLoading] = useState(false);

  const passwordValue = formState.watch('password');
  const passwordValidation = passwordValidator(passwordValue ?? '');

  const onSubmit = handleSubmit(async (payload) => {
    setLoading(true);
    try {
      if (!passwordValidation.isAllTrue) return;
      const response = await actionSignUp(payload);

      setRequestState(response);

      if (response.isSuccess) {
        toast.success('Sign up success!');
        formState.reset();
        return;
      }

      if (response.isError) {
        toast.error(response.message);
      }
    } finally {
      setLoading(false);
    }
  }) as (e?: BaseSyntheticEvent) => void;

  return (
    <>
      {requestState.isSuccess && (
        <Alert severity="success">
          Sign Up Success! Back to{' '}
          <Link href="/auth/sign-in" passHref>
            <span className="text-underline">Sign In</span>
          </Link>
        </Alert>
      )}
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
        <AuthSignUpFormContent {...formState} loading={loading} />

        <LoadingButton type="submit" fullWidth variant="contained" sx={{ my: 2 }} loading={loading}>
          Sign Up
        </LoadingButton>

        <AuthSignUpActions />
      </Box>
    </>
  );
};

export default AuthSignUpForm;
