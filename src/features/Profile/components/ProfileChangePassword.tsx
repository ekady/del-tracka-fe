// React
import { ChangeEvent, useCallback } from 'react';

// React Hook Form
import { RegisterOptions, Controller } from 'react-hook-form';

// MUI
import { Box } from '@mui/material';

// Local Components
import { CustomInput, PasswordRequirement } from '@/common/base';

import { ProfileChildProps } from './Profile';
import { FunctionVoidWithParams } from '@/common/types';
import { ProfilePassword } from '../store/profile.api.slice';
import { passwordValidator } from '@/common/base/PasswordRequirement/helper';

type ProfileChangePasswordKey = keyof ProfilePassword;

export type ProfileChangePasswordValidation = {
  [key in ProfileChangePasswordKey]: RegisterOptions;
};

export interface ProfileChangePasswordProps extends ProfileChildProps<ProfileChangePasswordValidation> {}

const ProfileChangePassword = ({ formMethods, formOptions, disabled }: ProfileChangePasswordProps) => {
  const {
    control,
    formState: { errors, dirtyFields },
    getFieldState,
    trigger,
    watch,
  } = formMethods;

  const passwordValue = watch('password');
  const passwordValidation = passwordValidator(passwordValue ?? '');

  const validateTargetForm = useCallback(
    async (formTarget: ProfileChangePasswordKey) => {
      if (formTarget !== undefined && getFieldState(formTarget).isTouched) {
        await trigger(formTarget);
      }
    },
    [getFieldState, trigger],
  ) as FunctionVoidWithParams<ProfileChangePasswordKey>;

  const onChangeInput = useCallback(
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      onChange: FunctionVoidWithParams<string>,
      formTarget: ProfileChangePasswordKey,
    ) => {
      onChange(event.target.value);
      validateTargetForm(formTarget);
    },
    [validateTargetForm],
  );

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
              error: !passwordValidation.isAllTrue && dirtyFields.password,
              ...field,
              placeholder: !disabled ? 'Enter password' : '',
              type: 'password',
              onChange: (e) => onChangeInput(e, field.onChange, 'password'),
              onBlur: () => validateTargetForm('password'),
              disabled,
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
              onBlur: () => validateTargetForm('passwordConfirm'),
              disabled,
            }}
          />
        )}
      />
    </>
  );
};

export default ProfileChangePassword;
