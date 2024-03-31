// React
import { BaseSyntheticEvent, ChangeEvent, useCallback, useMemo } from 'react';

// Next Components
import Link from 'next/link';

// React Hook Form
import { Controller, useForm, UseFormGetValues } from 'react-hook-form';

// MUI Components
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// Local Components
import AuthWithGoogle from '@/features/auth/components/AuthWithGoogle';
import { ButtonLoading, CustomInput, PasswordRequirement } from '@/common/base';

// Helper
import { emailValidation } from '@/common/helper';

import { FunctionVoid, FunctionVoidWithParams } from '@/common/types';
import { useSignupMutation } from '@/features/auth/store/auth.api.slice';
import { toast } from 'react-toastify';
import { SignUpRequest } from '@/features/auth/interfaces';
import { passwordValidator } from '@/common/base/PasswordRequirement/helper';

type AuthSignUpForm = keyof SignUpRequest;

const validationRule = (getValues: UseFormGetValues<SignUpRequest>) => ({
  firstName: { required: true },
  lastName: { required: true },
  email: {
    required: true,
    validate: { email: (v: string) => emailValidation(v) },
  },
  password: { required: true },
  passwordConfirm: {
    required: true,
    validate: { sameConfirmPassword: (v: string) => v === getValues('password') },
  },
});

const AuthSignUpPage = () => {
  const [signUp, { isLoading, isSuccess }] = useSignupMutation();
  const {
    handleSubmit,
    getFieldState,
    formState: { errors, dirtyFields },
    getValues,
    trigger,
    control,
    reset,
    watch,
  } = useForm<SignUpRequest>({ mode: 'onSubmit' });

  const passwordValue = watch('password');
  const passwordValidation = passwordValidator(passwordValue ?? '');

  const validateTargetForm = useCallback(
    (formTarget?: AuthSignUpForm) => {
      return (async () => {
        if (formTarget !== undefined && getFieldState(formTarget).isTouched) {
          await trigger(formTarget);
        }
      }) as FunctionVoid;
    },
    [getFieldState, trigger],
  );

  const validation = useMemo(() => validationRule(getValues), [getValues]);

  const onChangeInput = useCallback(
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      onChange: FunctionVoidWithParams<string>,
      formTarget?: AuthSignUpForm,
    ) => {
      onChange(event.target.value);
      validateTargetForm(formTarget);
    },
    [validateTargetForm],
  );

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!passwordValidation.isAllTrue) return;
      await signUp(data).unwrap();
      toast.success('Sign up success!');
      reset();
    } catch {
      //
    }
  }) as (e?: BaseSyntheticEvent) => void;

  return (
    <>
      <Typography component="div" variant="h6">
        SIGN UP
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      {isSuccess && (
        <Alert severity="success">
          Sign Up Success! Back to{' '}
          <Link href="/auth/sign-in" passHref>
            <span className="text-underline">Sign In</span>
          </Link>
        </Alert>
      )}
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={validation.firstName}
          render={({ field }) => (
            <CustomInput
              fieldname="First Name"
              error={errors.firstName}
              TextFieldProps={{ placeholder: 'Enter first name', type: 'text', ...field }}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          rules={validation.lastName}
          render={({ field }) => (
            <CustomInput
              fieldname="Last Name"
              error={errors.lastName}
              TextFieldProps={{ placeholder: 'Enter last name', type: 'text', ...field }}
            />
          )}
        />
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
                error: !passwordValidation.isAllTrue && dirtyFields.password,
                ...field,
                onChange: (e) => onChangeInput(e, field.onChange, 'password'),
                onBlur: () => validateTargetForm('password'),
              }}
            />
          )}
        />
        <PasswordRequirement value={passwordValue ?? ''} />
        <Box height={20} />

        <Controller
          name="passwordConfirm"
          control={control}
          defaultValue=""
          rules={validation.passwordConfirm}
          render={({ field }) => (
            <CustomInput
              fieldname="Confirm Password"
              error={errors.passwordConfirm}
              TextFieldProps={{
                placeholder: 'Enter confirm password',
                type: 'password',
                ...field,
                onChange: (e) => onChangeInput(e, field.onChange, 'passwordConfirm'),
                onBlur: () => validateTargetForm('passwordConfirm'),
              }}
            />
          )}
        />
        <ButtonLoading type="submit" fullWidth variant="contained" sx={{ my: 2 }} loading={isLoading}>
          Sign Up
        </ButtonLoading>
        <AuthWithGoogle />
        <Divider orientation="horizontal" flexItem sx={{ my: 3 }} />
        <Link href="/auth/sign-in" passHref>
          <Button fullWidth variant="outlined" sx={{ mb: 2 }} disabled={isLoading}>
            Sign In
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default AuthSignUpPage;
