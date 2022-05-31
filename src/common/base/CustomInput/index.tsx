// React Hook Form
import { FieldError } from 'react-hook-form';

// MUI Components
import { InputLabel, TextField, TextFieldProps } from '@mui/material';

// Helper
import { extractErrorMessage } from '@/common/helper';

export type CustomInputProps = {
  TextFieldProps?: TextFieldProps;
  fieldname?: string;
  defaultHelperText?: string;
  error?: FieldError;
};

const CustomInput = ({ TextFieldProps, fieldname, defaultHelperText, error }: CustomInputProps) => {
  const [containError, errorMessage] = extractErrorMessage(error, fieldname, defaultHelperText);

  const defaultStyle = {
    marginTop: 0,
    marginBottom: 2,
    fontSize: 14,
  };

  return (
    <>
      <InputLabel margin="dense" sx={{ fontSize: '0.875rem', color: 'black' }}>
        {fieldname}
      </InputLabel>
      <TextField
        error={containError}
        helperText={errorMessage}
        size="small"
        margin="normal"
        fullWidth
        {...TextFieldProps}
        sx={{ ...defaultStyle, ...TextFieldProps?.sx }}
        InputProps={{ ...TextFieldProps?.InputProps, sx: { backgroundColor: 'white', ...TextFieldProps?.InputProps?.sx } }}
      />
    </>
  );
};

export default CustomInput;
