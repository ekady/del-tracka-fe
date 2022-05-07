// Components
import { InputLabel, TextField } from '@mui/material';

// Constants
import { validationMessages } from '@/common/constants';

import { CustomInputProps } from './type';

const CustomInput = ({ TextFieldProps, fieldname, defaultHelperText, error }: CustomInputProps) => {
  const errorType = error?.type ?? '';
  const fieldnameAlias = fieldname ?? '';
  const errorMessage = !!errorType ? validationMessages[errorType]?.replace('{attribute}', fieldnameAlias) : defaultHelperText;

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
        error={!!errorType}
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
