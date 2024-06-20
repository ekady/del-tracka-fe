import { UseFormGetValues } from 'react-hook-form';

import { emailValidation } from '@/app/_common/helper';
import { ISignUpRequest } from '@/app/auth/_interfaces';

const validationRule = (getValues: UseFormGetValues<ISignUpRequest>) => ({
  firstName: { required: true },
  lastName: { required: true },
  email: {
    required: true,
    validate: { email: (v: string) => emailValidation(v) },
  },
  password: { required: true },
  passwordConfirm: {
    required: true,
    validate: { sameConfirmPassword: (v: string) => v === getValues('password') },
  },
});

export default validationRule;
