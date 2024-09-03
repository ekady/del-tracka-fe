'use client';

import { useState } from 'react';

import { Alert, Box } from '@mui/material';
import { useForm } from 'react-hook-form';

import CustomInput from '@/app/_common/base/CustomInput';
import { IResponseMessage, responseMessage } from '@/app/_common/constants/responseMessage.constant';
import { emailValidation } from '@/app/_common/helper';
import { IForgotPasswordRequest } from '@/app/auth/_interfaces';
import { actionForgotPassword } from '@/app/auth/forgot-password/_actions/forgotPassword.action';
import AuthForgotPasswordActions from '@/app/auth/forgot-password/_components/AuthForgotPasswordActions';

const validation = {
  email: {
    required: true,
    validate: { email: (v: string) => emailValidation(v) },
  },
};

const AuthForgotPasswordForm = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<IForgotPasswordRequest>({ mode: 'all' });

  const [requestState, setRequestState] = useState<IResponseMessage>({ ...responseMessage });
  const [loading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (payload) => {
    setLoading(true);
    try {
      const response = await actionForgotPassword(payload);
      setRequestState(response);
      if (response.isSuccess) reset();
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      {requestState.isSuccess && <Alert severity="success">Check your email for further instruction</Alert>}
      {requestState.isError && <Alert severity="error">{requestState.message}</Alert>}
      <Box component="form" sx={{ mt: 1 }} onSubmit={onSubmit}>
        <CustomInput
          fieldname="Email Address"
          error={errors.email}
          TextFieldProps={{
            placeholder: 'Enter email address',
            type: 'email',
            required: true,
            autoComplete: 'current-username',
            disabled: loading,
            ...register('email', { ...validation.email }),
          }}
        />
        <AuthForgotPasswordActions loading={loading} />
      </Box>
    </>
  );
};

export default AuthForgotPasswordForm;
