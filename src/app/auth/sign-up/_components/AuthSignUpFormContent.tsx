import { Box } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';

import CustomInput from '@/app/_common/base/CustomInput';
import { ISignUpRequest } from '@/app/auth/_interfaces';
import PasswordRequirement from '@/app/auth/sign-up/_components/AuthPasswordRequirement';
import { passwordValidator } from '@/app/auth/sign-up/_helper/passwordConfirm';
import validationRule from '@/app/auth/sign-up/_helper/validation';

interface IAuthSignUpFormContentProps extends Omit<UseFormReturn<ISignUpRequest>, 'handleSubmit'> {
  loading?: boolean;
}

const AuthSignUpFormContent = ({ register, getValues, formState, watch }: IAuthSignUpFormContentProps) => {
  const validation = getValues ? validationRule(getValues) : null;

  const passwordValue = watch('password');
  const passwordValidation = passwordValidator(passwordValue ?? '');
  return (
    <>
      <CustomInput
        fieldname="First Name"
        error={formState?.errors.firstName}
        TextFieldProps={{
          placeholder: 'Enter first name',
          type: 'text',
          ...register('firstName', { ...validation?.firstName }),
        }}
      />
      <CustomInput
        fieldname="Last Name"
        error={formState?.errors.lastName}
        TextFieldProps={{
          placeholder: 'Enter last name',
          type: 'text',
          ...register('lastName', { ...validation?.lastName }),
        }}
      />
      <CustomInput
        fieldname="Email Address"
        error={formState?.errors.email}
        TextFieldProps={{
          placeholder: 'Enter email address',
          type: 'email',
          ...register('email', { ...validation?.email }),
        }}
      />
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
    </>
  );
};

export default AuthSignUpFormContent;
