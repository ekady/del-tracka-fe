// Helper
import { UseFormReturn, RegisterOptions } from 'react-hook-form';

// MUI Components
import { TextField } from '@mui/material';

// Local Components
import { CustomInputs } from '@/common/components/base';
import { ProfileData } from '../ProfileUI';

export type ProfileChangePasswordField = {
  password: string;
  confirm_password: string;
};

export type ProfileChangePasswordValidation = {
  password: RegisterOptions;
  confirm_password: RegisterOptions;
};

export interface ProfileChangePasswordProps {
  formMethods: UseFormReturn<ProfileData>;
  formOptions: ProfileChangePasswordValidation;
  disabled?: boolean;
}

type ProfileChangePasswordForm = 'password' | 'confirm_password';

export default function ProfileChangePassword({ formMethods, formOptions, disabled }: ProfileChangePasswordProps) {
  const {
    register,
    formState: { errors },
    getFieldState,
    trigger,
  } = formMethods;

  const validateTargetForm = async (formTarget?: ProfileChangePasswordForm) => {
    if (formTarget !== undefined && getFieldState(formTarget).isTouched) {
      await trigger(formTarget);
    }
  };

  return (
    <>
      <CustomInputs
        Component={TextField}
        name="Password"
        error={errors.password}
        componentProps={{
          ...register('password', {
            ...formOptions.password,
            onChange: async () => await validateTargetForm('confirm_password'),
            onBlur: async () => await validateTargetForm('confirm_password'),
          }),
          margin: 'normal',
          fullWidth: true,
          placeholder: 'Enter password',
          type: 'password',
          name: 'password',
          id: 'password',
          disabled,
        }}
      />
      <CustomInputs
        Component={TextField}
        name="Confirm Password"
        error={errors.confirm_password}
        componentProps={{
          ...register('confirm_password', {
            ...formOptions.confirm_password,
            onChange: async () => await validateTargetForm('password'),
            onBlur: async () => await validateTargetForm('password'),
          }),
          margin: 'normal',
          fullWidth: true,
          placeholder: 'Enter confirm password',
          name: 'confirm_password',
          type: 'password',
          id: 'confirm_password',
          disabled,
        }}
      />
    </>
  );
}
