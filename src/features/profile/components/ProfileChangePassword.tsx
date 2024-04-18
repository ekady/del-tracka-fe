// React
import { ChangeEvent, useCallback } from 'react';

// React Hook Form
import { RegisterOptions, Controller } from 'react-hook-form';

// MUI
import Box from '@mui/material/Box';

// Local Components
import { CustomInput, PasswordRequirement } from '@/common/base';

import { IProfileChildProps } from './Profile';
import { TFunctionVoidWithParams } from '@/common/types';
import { IProfilePassword } from '../store/profile.api.slice';
import { passwordValidator } from '@/common/base/PasswordRequirement/helper';

type TProfileChangePasswordKey = keyof IProfilePassword;

export type TProfileChangePasswordValidation = {
  [key in TProfileChangePasswordKey]: RegisterOptions;
};

export interface IProfileChangePasswordProps extends IProfileChildProps<TProfileChangePasswordValidation> {}

const ProfileChangePassword = ({ formMethods, formOptions, disabled }: IProfileChangePasswordProps) => {
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
    async (formTarget: TProfileChangePasswordKey) => {
      if (formTarget !== undefined && getFieldState(formTarget).isTouched) {
        await trigger(formTarget);
      }
    },
    [getFieldState, trigger],
  ) as TFunctionVoidWithParams<TProfileChangePasswordKey>;

  const onChangeInput = useCallback(
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      onChange: TFunctionVoidWithParams<string>,
      formTarget: TProfileChangePasswordKey,
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
