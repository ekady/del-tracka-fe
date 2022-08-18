import { FieldError } from 'react-hook-form';
import { validationMessages } from '../constants';

export function emailValidation(value: string) {
  return /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(value);
}

export const extractErrorMessage = (
  error?: FieldError,
  fieldname?: string,
  defaultMessage?: string,
): [boolean, string] => {
  const errorType = error?.type ?? '';
  const fieldnameAlias = fieldname ?? '';
  const errorMessage = !!errorType
    ? validationMessages[errorType]?.replace('{attribute}', fieldnameAlias)
    : defaultMessage ?? '';

  return [!!errorType, errorMessage];
};
