// Next Components
import Link from 'next/link';

// Helper
import { emailValidation } from '../../../common/helper';
import { Controller, useForm } from 'react-hook-form';

// MUI Components
import { Box, Button, Divider, Typography } from '@mui/material';

// Local Components
import { AuthWithGoogle } from './components';
import { CustomInput } from '@/common/base';

export type AuthLoginData = {
  email: string;
  password: string;
};

export default function AuthLoginUI() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AuthLoginData>({ mode: 'onSubmit' });

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

  const onSubmit = handleSubmit((data) => console.log(data));

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
        <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
          Sign In
        </Button>
        <AuthWithGoogle isSignIn />
        <Divider orientation="horizontal" flexItem sx={{ my: 3 }} />
        <Link href="/sign-up" passHref>
          <Button type="submit" fullWidth variant="outlined" sx={{ mb: 2 }}>
            Sign Up
          </Button>
        </Link>
      </Box>
    </>
  );
}
