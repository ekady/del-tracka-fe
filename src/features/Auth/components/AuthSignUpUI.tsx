// React
import { ChangeEvent } from 'react';

// Next Components
import Link from 'next/link';

// React Hook Form
import { Controller, useForm } from 'react-hook-form';

// MUI Components
import { Alert, Box, Button, Divider, Typography } from '@mui/material';

// Local Components
import AuthWithGoogle from './AuthWithGoogle';
import { ButtonLoading, CustomInput } from '@/common/base';

// Helper
import { emailValidation } from '@/common/helper';

import { FunctionVoidWithParams } from '@/common/types';
import { SignUpRequest, useSignupMutation } from '../store/auth.api.slice';
import { toast } from 'react-toastify';

type AuthSignUpForm = keyof SignUpRequest;

const AuthSignUpUI = () => {
  const [signUp, { isLoading, isSuccess }] = useSignupMutation();
  const {
    handleSubmit,
    getFieldState,
    formState: { errors },
    getValues,
    trigger,
    control,
    reset,
  } = useForm<SignUpRequest>({ mode: 'onSubmit' });

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
    confirmPassword: {
      required: true,
      validate: {
        sameConfirmPassword: (v: string) => v === getValues('password'),
      },
    },
  };

  const validateTargetForm = (formTarget?: AuthSignUpForm) => {
    return async () => {
      if (formTarget !== undefined && getFieldState(formTarget).isTouched) {
        await trigger(formTarget);
      }
    };
  };

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    onChange: FunctionVoidWithParams<string>,
    formTarget?: AuthSignUpForm,
  ) => {
    onChange(event.target.value);
    validateTargetForm(formTarget);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp(data).unwrap();
      toast.success('Sign up success!');
      reset();
    } catch {}
  });

  return (
    <>
      <Typography component="div" variant="h6">
        SIGN UP
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      {isSuccess && (
        <Alert severity="success">
          Sign Up Success! Back to{' '}
          <Link href="/sign-in" passHref>
            <a className="text-underline">Sign In</a>
          </Link>
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
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={validation.confirmPassword}
          render={({ field }) => (
            <CustomInput
              fieldname="Confirm Password"
              error={errors.confirmPassword}
              TextFieldProps={{
                placeholder: 'Enter confirm password',
                type: 'password',
                ...field,
                onChange: (e) => onChangeInput(e, field.onChange, 'confirmPassword'),
                onBlur: async () => validateTargetForm('confirmPassword'),
              }}
            />
          )}
        />
        <ButtonLoading type="submit" fullWidth variant="contained" sx={{ my: 2 }} loading={isLoading}>
          Sign Up
        </ButtonLoading>
        <AuthWithGoogle isSignIn={false} />
        <Divider orientation="horizontal" flexItem sx={{ my: 3 }} />
        <Link href="/sign-in" passHref>
          <Button type="submit" fullWidth variant="outlined" sx={{ mb: 2 }} disabled={isLoading}>
            Sign In
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default AuthSignUpUI;
