// React
import { BaseSyntheticEvent, ChangeEvent, useCallback, useMemo } from 'react';

// Next
import { useRouter } from 'next/router';
import Link from 'next/link';

// React Hook Form
import { Controller, useForm, UseFormGetValues } from 'react-hook-form';

// MUI Components
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// Local Components
import { ButtonLoading, CustomInput, PasswordRequirement } from '@/common/base';

// Store
import { ResetPasswordForm, ResetPasswordRequest } from '@/features/auth/interfaces';
import { useResetPasswordMutation } from '@/features/auth/store/auth.api.slice';
import { FunctionVoid, FunctionVoidWithParams } from '@/common/types';
import AuthResetInvalid from '@/features/auth/components/AuthResetInvalid';
import { passwordValidator } from '@/common/base/PasswordRequirement/helper';

const validationRule = (getValues: UseFormGetValues<ResetPasswordForm>) => ({
  password: { required: true },
  passwordConfirm: {
    required: true,
    validate: { sameConfirmPassword: (v: string) => v === getValues('password') },
  },
});
export interface ResetPasswordProps {
  tokenValid: boolean;
}

const ResetPassword = ({ tokenValid }: ResetPasswordProps) => {
  const {
    handleSubmit,
    formState: { errors, dirtyFields },
    control,
    reset,
    trigger,
    getFieldState,
    getValues,
    watch,
  } = useForm<ResetPasswordForm>({ mode: 'onSubmit' });
  const router = useRouter();
  const [resetPassword, { isLoading, isSuccess, isError }] = useResetPasswordMutation();

  const passwordValue = watch('password');
  const passwordValidation = passwordValidator(passwordValue ?? '');

  const validateTargetForm = useCallback(
    (formTarget?: keyof ResetPasswordForm) => {
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
      formTarget?: keyof ResetPasswordForm,
    ) => {
      onChange(event.target.value);
      validateTargetForm(formTarget);
    },
    [validateTargetForm],
  );

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!passwordValidation.isAllTrue) return;
      const payload: ResetPasswordRequest = { ...data, resetToken: router.query?.token as string };
      await resetPassword(payload).unwrap();
      reset();
    } catch {
      //
    }
  }) as (e?: BaseSyntheticEvent) => void;

  return (
    <>
      <Typography component="div" variant="h6">
        RESET YOUR PASSWORD
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      {isSuccess && (
        <Alert severity="success">
          Your password successfully reseted! Back to{' '}
          <Link href="/auth/sign-in">
            <span className="text-underline">Sign In</span>
          </Link>
        </Alert>
      )}
      {!tokenValid || isError ? (
        <AuthResetInvalid />
      ) : (
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
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
                  disabled: isLoading,
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
                  disabled: isLoading,
                  onChange: (e) => onChangeInput(e, field.onChange, 'passwordConfirm'),
                  onBlur: () => validateTargetForm('passwordConfirm'),
                }}
              />
            )}
          />
          <ButtonLoading type="submit" fullWidth variant="contained" sx={{ my: 2 }} loading={isLoading}>
            Reset Password
          </ButtonLoading>
        </Box>
      )}
    </>
  );
};

export default ResetPassword;
