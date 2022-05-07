import { TextFieldProps } from '@mui/material';

import { IndexableString } from '@/common/types';

export interface CustomInputProps {
  TextFieldProps?: TextFieldProps;
  fieldname?: string;
  defaultHelperText?: string;
  error?: IndexableString;
}
