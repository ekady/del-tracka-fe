// React
import { ChangeEvent } from 'react';

// React Hook Form
import { UseFormReturn, RegisterOptions, Controller } from 'react-hook-form';

// Local Components
import { CustomInput } from '@/common/base';
import { ProfileData } from '../ProfileUI';

import { FunctionVoidWithParams, PasswordForm } from '@/types';

export type ProfileChangePasswordField = {
  [key in PasswordForm]: string;
};

export type ProfileChangePasswordValidation = {
  [key in PasswordForm]: RegisterOptions;
};

export type ProfileChangePasswordProps = {
  formMethods: UseFormReturn<ProfileData>;
  formOptions: ProfileChangePasswordValidation;
  disabled?: boolean;
};

const ProfileChangePassword = ({ formMethods, formOptions, disabled }: ProfileChangePasswordProps) => {
  const {
    control,
    formState: { errors },
    getFieldState,
    trigger,
  } = formMethods;

  const validateTargetForm = async (formTarget?: PasswordForm) => {
    if (formTarget !== undefined && getFieldState(formTarget).isTouched) {
      await trigger(formTarget);
    }
  };

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    onChange: FunctionVoidWithParams<string>,
    formTarget?: PasswordForm,
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
              ...field,
              placeholder: !disabled ? 'Enter password' : '',
              type: 'password',
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
              ...field,
              placeholder: !disabled ? 'Enter confirm password' : '',
              type: 'password',
              onChange: (e) => onChangeInput(e, field.onChange, 'confirm_password'),
              onBlur: async () => validateTargetForm('confirm_password'),
              disabled,
            }}
          />
        )}
      />
    </>
  );
};

export default ProfileChangePassword;
