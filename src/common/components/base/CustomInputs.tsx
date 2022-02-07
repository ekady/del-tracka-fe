// Next Components
import { NextComponentType } from 'next';

// Components
import { InputLabel } from '@mui/material';

// Constants
import { validationMessages } from '../../constants';

type indexable = {
  [key: string]: any;
};

interface CustomInputsProps {
  Component: NextComponentType;
  componentProps: any;
  name: string;
  defaultHelperText?: string;
  error?: indexable;
}

export default function CustomInputs({ Component, componentProps, name, defaultHelperText, error }: CustomInputsProps) {
  const isError = !!error?.type ?? false;
  const errorMessage = isError ? validationMessages[error?.type]?.replace('{attribute}', name) : defaultHelperText;

  const sx = {
    marginTop: 0,
    marginBottom: 2,
    fontSize: 14,
  };

  return (
    <>
      <InputLabel margin="dense" sx={{ fontSize: '0.875rem', color: 'black' }}>
        {name}
      </InputLabel>
      <Component {...componentProps} error={isError} helperText={errorMessage} size="small" sx={sx} />
    </>
  );
}
