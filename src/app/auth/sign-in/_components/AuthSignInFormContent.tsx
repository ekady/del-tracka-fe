import Link from 'next/link';

import { LoadingButton } from '@mui/lab';
import { Button, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';

import CustomInput from '@/app/_common/base/CustomInput';
import { emailValidation } from '@/app/_common/helper';
import { ILoginRequest } from '@/app/auth/_interfaces';

const validation = {
  email: {
    required: true,
    validate: { email: (v: string) => emailValidation(v) },
  },
  password: { required: true },
};

interface IAuthSignInFormContentProps extends Omit<UseFormReturn<ILoginRequest>, 'handleSubmit'> {
  loading?: boolean;
}

const AuthSignInFormContent = ({ register, loading, formState }: IAuthSignInFormContentProps) => {
  return (
    <>
      <CustomInput
        fieldname="Email Address"
        error={formState.errors.email}
        TextFieldProps={{
          placeholder: 'Enter email address',
          type: 'email',
          autoComplete: 'current-username',
          disabled: loading,
          ...register('email', { ...validation.email }),
        }}
      />
      <CustomInput
        fieldname="Pasword"
        error={formState.errors.password}
        TextFieldProps={{
          placeholder: 'Enter password',
          type: 'password',
          autoComplete: 'current-password',
          disabled: loading,
          ...register('password', { ...validation.password }),
        }}
      />
      <LoadingButton type="submit" fullWidth variant="contained" sx={{ my: 2 }} loading={loading}>
        Sign In
      </LoadingButton>
      <div style={{ textAlign: 'right', marginBottom: 12 }}>
        <Button color="inherit" LinkComponent={Link} href="/auth/forgot-password" variant="text">
          <Typography component="span" variant="caption" sx={{ textTransform: 'capitalize' }}>
            Forgot Password?
          </Typography>
        </Button>
      </div>
    </>
  );
};

export default AuthSignInFormContent;
