// React
import { ReactElement, useState } from 'react';

// Next
import Link from 'next/link';

// React Hook Form
import { Controller, useForm } from 'react-hook-form';

// MUI Components
import { Box, Button, Divider, Typography } from '@mui/material';

// Local Components
import { LayoutAuth } from '@/common/layout';
import AuthWithGoogle from '@/features/Auth/components/AuthWithGoogle';
import { ButtonLoading, CustomInput } from '@/common/base';

// Helper
import { emailValidation } from '@/common/helper';

// Store
import { getSession, signIn } from 'next-auth/react';
import { LoginRequest } from '@/features/Auth/interfaces';
import { useAppDispatch } from '@/common/store';
import { setCredential } from '@/features/Auth/store/auth.slice';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const validation = {
  email: {
    required: true,
    validate: { email: (v: string) => emailValidation(v) },
  },
  password: { required: true },
};

const SignIn = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginRequest>({ mode: 'onSubmit' });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const redirect = router.query?.callbackUrl?.toString() ?? '/app/dashboard';
    const response = await signIn('credentials', { email: data.email, password: data.password, redirect: false });
    const session = await getSession();
    if (response?.ok && session) {
      dispatch(setCredential(session.user.userToken));
      router.replace(redirect);
    } else toast.error('Invalid email or password');
    setLoading(false);
  });

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
        <AuthWithGoogle disabled={loading} />
        <Divider orientation="horizontal" flexItem sx={{ my: 3 }} />
        <Link href="/auth/sign-up" passHref>
          <Button type="submit" fullWidth variant="outlined" sx={{ mb: 2 }} disabled={loading}>
            Sign Up
          </Button>
        </Link>
      </Box>
    </>
  );
};

SignIn.getLayout = (page: ReactElement) => {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export default SignIn;
