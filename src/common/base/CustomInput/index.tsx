// React Hook Form
import { FieldError } from 'react-hook-form';

// MUI Components
import { InputLabel, TextField, TextFieldProps } from '@mui/material';

// Hooks
import { useAppSelector } from '@/common/store';

// Helper
import { extractErrorMessage } from '@/common/helper';
import { selectColorTheme } from '@/common/store/selector';

export interface CustomInputProps {
  TextFieldProps?: TextFieldProps;
  fieldname?: string;
  defaultHelperText?: string;
  error?: FieldError;
}

const defaultStyle = {
  marginTop: 0,
  marginBottom: 2,
  fontSize: 14,
};

const CustomInput = ({ TextFieldProps, fieldname, defaultHelperText, error }: CustomInputProps) => {
  const [containError, errorMessage] = extractErrorMessage(error, fieldname, defaultHelperText);
  const isDark = useAppSelector(selectColorTheme) === 'dark';

  return (
    <>
      <InputLabel margin="dense" sx={{ fontSize: '0.875rem', color: isDark ? 'white' : 'black' }}>
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
        InputProps={{
          ...TextFieldProps?.InputProps,
          sx: { backgroundColor: isDark ? 'transparent' : 'white', ...TextFieldProps?.InputProps?.sx },
        }}
      />
    </>
  );
};

export default CustomInput;
