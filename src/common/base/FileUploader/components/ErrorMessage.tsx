import { Typography } from '@mui/material';

import { extractErrorMessage } from '@/common/helper';
import { FieldError } from 'react-hook-form';

type ErrorMessageProps = {
  width?: number | string;
  error?: FieldError;
};
const ErrorMessage = ({ width, error }: ErrorMessageProps) => {
  const [containError, errorMessage] = extractErrorMessage(error as FieldError, 'Image', '');
  if (!containError) return null;
  return (
    <Typography variant="body2" color="error" style={{ width }} align="center" marginTop={1}>
      {errorMessage}
    </Typography>
  );
};

export default ErrorMessage;
