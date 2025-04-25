// React Hook Form
import { ReactNode } from 'react';

import InputLabel from '@mui/material/InputLabel';
import { TextFieldProps } from '@mui/material/TextField';
import { FieldError } from 'react-hook-form';

import { extractErrorMessage } from '@/app/_common/helper';

import { TextFieldStyled } from './styled';

export interface ICustomInputProps {
  TextFieldProps?: TextFieldProps;
  fieldname?: string;
  defaultHelperText?: string;
  error?: FieldError;
  children?: ReactNode;
}

const defaultStyle = {
  marginBottom: 2,
};

const CustomInput = ({ TextFieldProps, fieldname, defaultHelperText, error, children }: ICustomInputProps) => {
  const [containError, errorMessage] = extractErrorMessage(error, fieldname, defaultHelperText);

  return (
    <>
      <InputLabel>{fieldname}</InputLabel>
      <TextFieldStyled
        error={containError}
        helperText={errorMessage}
        size="small"
        margin="normal"
        fullWidth
        {...TextFieldProps}
        sx={{ ...defaultStyle, ...TextFieldProps?.sx }}
        InputProps={TextFieldProps?.InputProps}
      >
        {children}
      </TextFieldStyled>
    </>
  );
};

export default CustomInput;
