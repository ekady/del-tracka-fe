// Next Components
import Link from 'next/link';

// Helper
import { emailValidation } from '../../../common/helper';
import { useForm } from 'react-hook-form';

// MUI Components
import { Box, Button, Divider, TextField, Typography } from '@mui/material';

// Local Components
import { CustomInputs } from '../../../common/components/base';
import { AuthWithGoogle } from './components';

export type AuthLoginData = {
  email: string;
  password: string;
};

export default function AuthLoginUI() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthLoginData>({ mode: 'all' });

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
        <CustomInputs
          Component={TextField}
          name="Email Address"
          error={errors.email}
          componentProps={{
            ...register('email', { ...validation.email }),
            margin: 'normal',
            fullWidth: true,
            placeholder: 'Enter email address',
            id: 'email',
            name: 'email',
            autoComplete: 'email',
            autoFocus: true,
          }}
        />
        <CustomInputs
          Component={TextField}
          name="Password"
          error={errors.password}
          componentProps={{
            ...register('password', { ...validation.password }),
            margin: 'normal',
            fullWidth: true,
            placeholder: 'Enter password',
            type: 'password',
            name: 'password',
            id: 'password',
          }}
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
