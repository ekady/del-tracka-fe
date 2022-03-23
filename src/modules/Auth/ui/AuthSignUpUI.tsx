// Next Components
import Link from 'next/link';

// Helper
import { useForm } from 'react-hook-form';
import { emailValidation } from '../../../common/helper';

// MUI Components
import { Box, Button, Divider, TextField, Typography } from '@mui/material';

// Local Components
import { AuthWithGoogle } from './components';
import { CustomInputs } from '../../../common/components/base';

export type AuthSignUpData = {
  email: string;
  password: string;
  confirm_password: string;
};

type Forms = 'email' | 'password' | 'confirm_password';

export default function AuthLoginUI() {
  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<AuthSignUpData>({ mode: 'all' });

  const validation = {
    email: {
      required: true,
      validate: {
        email: (v: string) => emailValidation(v),
      },
    },
    password: {
      required: true,
      validate: {
        samePassword: (v: string) => v === getValues('confirm_password'),
      },
    },
    confirm_password: {
      required: true,
      validate: {
        sameConfirmPassword: (v: string) => v === getValues('password'),
      },
    },
  };

  const validateTargetForm = async (formTarget?: Forms) => {
    if (formTarget !== undefined && getFieldState(formTarget).isTouched) {
      await trigger(formTarget);
    }
  };

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <>
      <Typography component="div" variant="h6">
        SIGN UP
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
            ...register('password', {
              ...validation.password,
              onChange: async () => await validateTargetForm('confirm_password'),
              onBlur: async () => await validateTargetForm('confirm_password'),
            }),
            margin: 'normal',
            fullWidth: true,
            placeholder: 'Enter password',
            type: 'password',
            name: 'password',
            id: 'password',
          }}
        />
        <CustomInputs
          Component={TextField}
          name="Confirm Password"
          error={errors.confirm_password}
          componentProps={{
            ...register('confirm_password', {
              ...validation.confirm_password,
              onChange: async () => await validateTargetForm('password'),
              onBlur: async () => await validateTargetForm('password'),
            }),
            margin: 'normal',
            fullWidth: true,
            placeholder: 'Enter confirm password',
            name: 'confirm_password',
            type: 'password',
            id: 'confirm_password',
          }}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
          Sign Up
        </Button>
        <AuthWithGoogle isSignIn={false} />
        <Divider orientation="horizontal" flexItem sx={{ my: 3 }} />
        <Link href="/sign-in" passHref>
          <Button type="submit" fullWidth variant="outlined" sx={{ mb: 2 }}>
            Sign In
          </Button>
        </Link>
      </Box>
    </>
  );
}
