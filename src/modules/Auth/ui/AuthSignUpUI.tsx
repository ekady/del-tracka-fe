// Next Components
import Link from 'next/link';

// Helper
import { Controller, useForm } from 'react-hook-form';
import { emailValidation } from '../../../common/helper';

// MUI Components
import { Box, Button, Divider, Typography } from '@mui/material';

// Local Components
import { AuthWithGoogle } from './components';
import { CustomInput } from '@/common/base';
import { ChangeEvent } from 'react';
import { FunctionVoidWithParams } from '@/common/types';

export type AuthSignUpData = {
  email: string;
  password: string;
  confirm_password: string;
};

type Forms = 'email' | 'password' | 'confirm_password';

export default function AuthLoginUI() {
  const {
    handleSubmit,
    getFieldState,
    formState: { errors },
    getValues,
    trigger,
    control,
  } = useForm<AuthSignUpData>({ mode: 'onSubmit' });

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
    confirm_password: {
      required: true,
      validate: {
        sameConfirmPassword: (v: string) => v === getValues('password'),
      },
    },
  };

  const validateTargetForm = (formTarget?: Forms) => {
    return async () => {
      if (formTarget !== undefined && getFieldState(formTarget).isTouched) {
        await trigger(formTarget);
      }
    };
  };

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    onChange: FunctionVoidWithParams,
    formTarget?: Forms,
  ) => {
    onChange(event.target.value);
    validateTargetForm(formTarget);
  };

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <>
      <Typography component="div" variant="h6">
        SIGN UP
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
              fieldname="Password"
              error={errors.password}
              TextFieldProps={{
                placeholder: 'Enter password',
                type: 'password',
                ...field,
                onChange: (e) => onChangeInput(e, field.onChange, 'password'),
                onBlur: async () => validateTargetForm('password'),
              }}
            />
          )}
        />
        <Controller
          name="confirm_password"
          control={control}
          defaultValue=""
          rules={validation.confirm_password}
          render={({ field }) => (
            <CustomInput
              fieldname="Confirm Password"
              error={errors.confirm_password}
              TextFieldProps={{
                placeholder: 'Enter confirm password',
                type: 'password',
                ...field,
                onChange: (e) => onChangeInput(e, field.onChange, 'confirm_password'),
                onBlur: async () => validateTargetForm('confirm_password'),
              }}
            />
          )}
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
