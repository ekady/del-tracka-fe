import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { UseFormGetValues, UseFormReturn } from 'react-hook-form';

import CustomInput from '@/app/_common/base/CustomInput';
import { IResetPasswordForm } from '@/app/auth/_interfaces';
import PasswordRequirement from '@/app/auth/sign-up/_components/AuthPasswordRequirement';
import { passwordValidator } from '@/app/auth/sign-up/_helper/passwordConfirm';

interface IAuthResetPasswordFormContentProps extends Omit<UseFormReturn<IResetPasswordForm>, 'handleSubmit'> {
  loading?: boolean;
}

const validationRule = (getValues: UseFormGetValues<IResetPasswordForm>) => ({
  password: { required: true },
  passwordConfirm: {
    required: true,
    validate: { sameConfirmPassword: (v: string) => v === getValues('password') },
  },
});

const AuthResetPasswordFormContent = ({
  register,
  getValues,
  formState,
  watch,
  loading,
}: IAuthResetPasswordFormContentProps) => {
  const validation = getValues ? validationRule(getValues) : null;

  const passwordValue = watch('password');
  const passwordValidation = passwordValidator(passwordValue ?? '');
  return (
    <>
      <CustomInput
        fieldname="Password"
        error={formState?.errors.password}
        TextFieldProps={{
          placeholder: 'Enter password',
          type: 'password',
          error: !passwordValidation.isAllTrue && formState?.touchedFields.password,
          ...register('password', { ...validation?.password }),
        }}
      />

      <PasswordRequirement value={passwordValue ?? ''} />
      <Box height={20} />

      <CustomInput
        fieldname="Confirm Password"
        error={formState?.errors.passwordConfirm}
        TextFieldProps={{
          placeholder: 'Enter confirm password',
          type: 'password',
          ...register('passwordConfirm', { ...validation?.passwordConfirm }),
        }}
      />

      <LoadingButton type="submit" fullWidth variant="contained" sx={{ my: 2 }} loading={loading}>
        Reset Password
      </LoadingButton>
    </>
  );
};

export default AuthResetPasswordFormContent;
