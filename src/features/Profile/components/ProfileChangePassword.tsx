// React
import { ChangeEvent } from 'react';

// React Hook Form
import { RegisterOptions, Controller } from 'react-hook-form';

// Local Components
import { CustomInput } from '@/common/base';

import { ProfileChildProps } from './Profile';
import { FunctionVoidWithParams } from '@/common/types';
import { ProfilePassword } from '../store/profile.api.slice';

type ProfileChangePasswordKey = keyof ProfilePassword;

export type ProfileChangePasswordValidation = {
  [key in ProfileChangePasswordKey]: RegisterOptions;
};

export type ProfileChangePasswordProps = ProfileChildProps<ProfileChangePasswordValidation>;

const ProfileChangePassword = ({ formMethods, formOptions, disabled }: ProfileChangePasswordProps) => {
  const {
    control,
    formState: { errors },
    getFieldState,
    trigger,
  } = formMethods;

  const validateTargetForm = async (formTarget?: ProfileChangePasswordKey) => {
    if (formTarget !== undefined && getFieldState(formTarget).isTouched) {
      await trigger(formTarget);
    }
  };

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    onChange: FunctionVoidWithParams<string>,
    formTarget?: ProfileChangePasswordKey,
  ) => {
    onChange(event.target.value);
    validateTargetForm(formTarget);
  };

  return (
    <>
      <Controller
        name="resetPassword"
        control={control}
        defaultValue=""
        rules={formOptions.resetPassword}
        render={({ field }) => (
          <CustomInput
            fieldname="Password"
            error={errors.resetPassword}
            TextFieldProps={{
              ...field,
              placeholder: !disabled ? 'Enter password' : '',
              type: 'password',
              onChange: (e) => onChangeInput(e, field.onChange, 'resetPassword'),
              onBlur: async () => validateTargetForm('resetPassword'),
              disabled,
            }}
          />
        )}
      />
      <Controller
        name="confirmResetPassword"
        control={control}
        defaultValue=""
        rules={formOptions.confirmResetPassword}
        render={({ field }) => (
          <CustomInput
            fieldname="Confirm Password"
            error={errors.confirmResetPassword}
            TextFieldProps={{
              ...field,
              placeholder: !disabled ? 'Enter confirm password' : '',
              type: 'password',
              onChange: (e) => onChangeInput(e, field.onChange, 'confirmResetPassword'),
              onBlur: async () => validateTargetForm('confirmResetPassword'),
              disabled,
            }}
          />
        )}
      />
    </>
  );
};

export default ProfileChangePassword;
