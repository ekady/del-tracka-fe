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

export interface ProfileChangePasswordProps extends ProfileChildProps<ProfileChangePasswordValidation> {}

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
        name="passwordConfirm"
        control={control}
        defaultValue=""
        rules={formOptions.passwordConfirm}
        render={({ field }) => (
          <CustomInput
            fieldname="Confirm Password"
            error={errors.passwordConfirm}
            TextFieldProps={{
              ...field,
              placeholder: !disabled ? 'Enter confirm password' : '',
              type: 'password',
              onChange: (e) => onChangeInput(e, field.onChange, 'passwordConfirm'),
              onBlur: async () => validateTargetForm('passwordConfirm'),
              disabled,
            }}
          />
        )}
      />
    </>
  );
};

export default ProfileChangePassword;