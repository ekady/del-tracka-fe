'use client';

import { BaseSyntheticEvent, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import Box from '@mui/material/Box';
import { SignInResponse, signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { ILoginRequest } from '@/app/auth/_interfaces';

import AuthSignInActions from './AuthSignInActions';
import AuthSignInFormContent from './AuthSignInFormContent';

const AuthSignInForm = () => {
  const { handleSubmit, ...formState } = useForm<ILoginRequest>({ mode: 'onSubmit' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const queryParams = useSearchParams();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const redirectPath = queryParams.get('callbackUrl') ?? '/app/dashboard';
      const response: SignInResponse | undefined = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.ok) {
        router.replace(redirectPath);
        return;
      }

      const errorMessage =
        response?.error === 'TOO_MANY_REQUESTS' ? 'Too many requests. Try again later' : 'Invalid email or password';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }) as (e?: BaseSyntheticEvent) => void;

  return (
    <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
      <AuthSignInFormContent {...formState} loading={loading} />

      <AuthSignInActions loading={loading} />
    </Box>
  );
};

export default AuthSignInForm;
