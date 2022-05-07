// React
import { ChangeEvent } from 'react';

// React Hook Form
import { UseFormReturn, RegisterOptions, Controller } from 'react-hook-form';

// Local Components
import { CustomInput } from '@/common/base';
import { ProfileData } from '../ProfileUI';

import { FunctionVoidWithParams } from '@/common/types';

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
    control,
    formState: { errors },
    getFieldState,
    trigger,
  } = formMethods;

  const validateTargetForm = async (formTarget?: ProfileChangePasswordForm) => {
    if (formTarget !== undefined && getFieldState(formTarget).isTouched) {
      await trigger(formTarget);
    }
  };

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    onChange: FunctionVoidWithParams,
    formTarget?: ProfileChangePasswordForm,
  ) => {
    onChange(event.target.value);
    validateTargetForm(formTarget);
  };

  return (
    <>
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={formOptions.password}
        render={({ field }) => (
          <CustomInput
            fieldname="Password"
            error={errors.password}
            TextFieldProps={{
              placeholder: !disabled ? 'Enter password' : '',
              type: 'password',
              ...field,
              onChange: (e) => onChangeInput(e, field.onChange, 'password'),
              onBlur: async () => validateTargetForm('password'),
              disabled,
            }}
          />
        )}
      />
      <Controller
        name="confirm_password"
        control={control}
        defaultValue=""
        rules={formOptions.confirm_password}
        render={({ field }) => (
          <CustomInput
            fieldname="Confirm Password"
            error={errors.confirm_password}
            TextFieldProps={{
              placeholder: !disabled ? 'Enter confirm password' : '',
              type: 'password',
              ...field,
              onChange: (e) => onChangeInput(e, field.onChange, 'confirm_password'),
              onBlur: async () => validateTargetForm('confirm_password'),
              disabled,
            }}
          />
        )}
      />
    </>
  );
}
