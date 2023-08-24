// React Hook Form
import { FieldError } from 'react-hook-form';

// MUI Components
import { TextFieldProps } from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

// Hooks
import { useAppSelector } from '@/common/store';

// Helper
import { extractErrorMessage } from '@/common/helper';
import { selectColorTheme } from '@/common/store/selector';
import { TextFieldStyled } from './styled';

export interface CustomInputProps {
  TextFieldProps?: TextFieldProps;
  fieldname?: string;
  defaultHelperText?: string;
  error?: FieldError;
}

const defaultStyle = {
  marginBottom: 2,
};

const CustomInput = ({ TextFieldProps, fieldname, defaultHelperText, error }: CustomInputProps) => {
  const [containError, errorMessage] = extractErrorMessage(error, fieldname, defaultHelperText);
  const isDark = useAppSelector(selectColorTheme) === 'dark';

  return (
    <>
      <InputLabel margin="dense" sx={{ fontSize: '0.875rem', color: isDark ? 'white' : 'black' }}>
        {fieldname}
      </InputLabel>
      <TextFieldStyled
        error={containError}
        helperText={errorMessage}
        size="small"
        margin="normal"
        fullWidth
        {...TextFieldProps}
        sx={{ ...defaultStyle, ...TextFieldProps?.sx }}
        InputProps={TextFieldProps?.InputProps}
      />
    </>
  );
};

export default CustomInput;
