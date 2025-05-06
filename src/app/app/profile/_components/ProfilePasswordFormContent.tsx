import { Box } from '@mui/material';
import { UseFormGetValues, UseFormReturn } from 'react-hook-form';

import CustomInput from '@/app/_common/base/CustomInput';
import { IProfileRequest } from '@/app/_common/types/profile.type';
import PasswordRequirement from '@/app/auth/sign-up/_components/AuthPasswordRequirement';
import { passwordValidator } from '@/app/auth/sign-up/_helper/passwordConfirm';

interface IProfilePasswordFormContentProps extends Omit<UseFormReturn<IProfileRequest>, 'handleSubmit' | 'resetField'> {
  disabled?: boolean;
}

const validationRule = (getValues: UseFormGetValues<IProfileRequest>) => ({
  password: { required: true },
  passwordConfirm: {
    required: true,
    validate: { sameConfirmPassword: (v: string | undefined) => v === getValues('password') },
  },
});

const ProfilePasswordFormContent = ({
  formState,
  register,
  getValues,
  watch,
  disabled,
}: IProfilePasswordFormContentProps) => {
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
          disabled,
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
          disabled,
          ...register('passwordConfirm', { ...validation?.passwordConfirm }),
        }}
      />
    </>
  );
};

export default ProfilePasswordFormContent;
