// React
import { BaseSyntheticEvent, ReactElement } from 'react';

// Next
import Link from 'next/link';

// React Hook Form
import { Controller, useForm } from 'react-hook-form';

// MUI Components
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';

// Local Components
import { LayoutAuth } from '@/common/layout';
import { ButtonLoading, CustomInput } from '@/common/base';

// Helper
import { emailValidation } from '@/common/helper';

// Toast
import { toast } from 'react-toastify';

// Store
import { ForgotPasswordRequest } from '@/features/auth/interfaces';
import { useForgotPasswordMutation } from '@/features/auth/store/auth.api.slice';

const validation = {
  email: {
    required: true,
    validate: { email: (v: string) => emailValidation(v) },
  },
};

const SignIn = () => {
  const theme = useTheme();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ForgotPasswordRequest>({ mode: 'onSubmit' });
  const [forgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation();

  const onSubmit = handleSubmit(async (data) => {
    const response = await forgotPassword(data).unwrap();
    if (response?.data.message !== 'Success') toast.error('Invalid email or password');
    else reset();
  }) as (e?: BaseSyntheticEvent) => void;

  return (
    <>
      <Typography component="div" variant="h6">
        Forgot Password
      </Typography>
      <Typography component="div" variant="caption" color={theme.palette.text.secondary} sx={{ mt: 1 }}>
        Please enter your email so we can send instruction for reset password to your email
      </Typography>

      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      {isSuccess && <Alert severity="success">Check your email for further instruction</Alert>}

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
                disabled: isLoading,
                ...field,
              }}
            />
          )}
        />
        <ButtonLoading type="submit" fullWidth variant="contained" sx={{ my: 2 }} loading={isLoading}>
          Send
        </ButtonLoading>
        <Divider orientation="horizontal" flexItem sx={{ my: 3 }} />
        <Link href="/auth/sign-in" passHref>
          <Button fullWidth variant="outlined" sx={{ mb: 2 }} disabled={isLoading}>
            Back to Sign In
          </Button>
        </Link>
      </Box>
    </>
  );
};

SignIn.getLayout = (page: ReactElement) => {
  return <LayoutAuth noRedirect>{page}</LayoutAuth>;
};

export default SignIn;
