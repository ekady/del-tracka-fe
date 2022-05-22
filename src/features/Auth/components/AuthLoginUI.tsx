// Next
import Link from 'next/link';
import { useRouter } from 'next/router';

// React Hook Form
import { Controller, useForm } from 'react-hook-form';

// MUI Components
import { Alert, Box, Button, Divider, Typography } from '@mui/material';

// Local Components
import AuthWithGoogle from './AuthWithGoogle';
import { ButtonLoading, CustomInput } from '@/common/base';

// Helper
import { emailValidation } from '@/common/helper';
import { LoginRequest, useLoginMutation } from '../store/auth.api.slice';

const AuthLoginUI = () => {
  const router = useRouter();
  const [login, { isLoading, isError, isSuccess }] = useLoginMutation();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginRequest>({ mode: 'onSubmit' });

  const validation = {
    email: {
      required: true,
      validate: {
        email: (v: string) => emailValidation(v),
      },
    },
    password: {
      required: true,
    },
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await login(data).unwrap();
      if (response) router.replace('/dashboard');
    } catch {}
  });

  return (
    <>
      <Typography component="div" variant="h6">
        SIGN IN
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      {(isSuccess || isError) && (
        <Alert severity={isSuccess ? 'success' : 'error'}>
          {isSuccess ? 'Sign In Success! Redirecting...' : 'Email or Password is wrong'}
        </Alert>
      )}
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={validation.email}
          render={({ field }) => (
            <CustomInput
              fieldname="Email Address"
              error={errors.email}
              TextFieldProps={{ placeholder: 'Enter email address', type: 'email', ...field }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={validation.password}
          render={({ field }) => (
            <CustomInput
              fieldname="Pasword"
              error={errors.password}
              TextFieldProps={{ placeholder: 'Enter password', type: 'password', ...field }}
            />
          )}
        />
        <ButtonLoading type="submit" fullWidth variant="contained" sx={{ my: 2 }} loading={isLoading}>
          Sign In
        </ButtonLoading>
        <AuthWithGoogle isSignIn />
        <Divider orientation="horizontal" flexItem sx={{ my: 3 }} />
        <Link href="/sign-up" passHref>
          <Button type="submit" fullWidth variant="outlined" sx={{ mb: 2 }} disabled={isLoading}>
            Sign Up
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default AuthLoginUI;
