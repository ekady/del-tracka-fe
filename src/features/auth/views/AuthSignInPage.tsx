// React
import { BaseSyntheticEvent, useState } from 'react';

// Next
import Link from 'next/link';

// React Hook Form
import { Controller, useForm } from 'react-hook-form';

// MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// Local Components
import AuthWithGoogle from '@/features/auth/components/AuthWithGoogle';
import { ButtonLoading, CustomInput } from '@/common/base';

// Helper
import { emailValidation } from '@/common/helper';

// Store
import { SignInResponse, signIn } from 'next-auth/react';
import { ILoginRequest } from '@/features/auth/interfaces';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const validation = {
  email: {
    required: true,
    validate: { email: (v: string) => emailValidation(v) },
  },
  password: { required: true },
};

const AuthSignInPage = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ILoginRequest>({ mode: 'onSubmit' });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const redirect = router.query?.callbackUrl?.toString() ?? '/app/dashboard';
    const response: SignInResponse | undefined = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (response?.ok) {
      router.replace(redirect).catch(() => {
        //
      });
    } else {
      const errorMessage =
        response?.error === 'TOO_MANY_REQUESTS' ? 'Too many requests. Try again later' : 'Invalid email or password';
      toast.error(errorMessage);
    }
    setLoading(false);
  }) as (e?: BaseSyntheticEvent) => void;

  return (
    <>
      <Typography component="div" variant="h6">
        SIGN IN
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
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
              TextFieldProps={{
                placeholder: 'Enter email address',
                type: 'email',
                autoComplete: 'current-username',
                disabled: loading,
                ...field,
              }}
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
              TextFieldProps={{
                placeholder: 'Enter password',
                type: 'password',
                autoComplete: 'current-password',
                disabled: loading,
                ...field,
              }}
            />
          )}
        />
        <ButtonLoading type="submit" fullWidth variant="contained" sx={{ my: 2 }} loading={loading}>
          Sign In
        </ButtonLoading>
        <Link href="/auth/forgot-password">
          <Typography component="p" variant="caption" sx={{ textAlign: 'right', mb: 2, mt: -1, cursor: 'pointer' }}>
            Forgot Password?
          </Typography>
        </Link>
        <AuthWithGoogle disabled={loading} />
        <Divider orientation="horizontal" flexItem sx={{ my: 3 }} />
        <Link href="/auth/sign-up" passHref>
          <Button fullWidth variant="outlined" sx={{ mb: 2 }} disabled={loading}>
            Sign Up
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default AuthSignInPage;
