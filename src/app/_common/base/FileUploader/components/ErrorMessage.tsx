import Typography from '@mui/material/Typography';
import { FieldError } from 'react-hook-form';

import { extractErrorMessage } from '@/app/_common/helper';

interface IErrorMessageProps {
  width?: number | string;
  error?: FieldError;
}
const ErrorMessage = ({ width, error }: IErrorMessageProps) => {
  const [containError, errorMessage] = extractErrorMessage(error as FieldError, 'Image', '');
  if (!containError) return null;
  return (
    <Typography variant="body2" color="error" style={{ width }} align="center" marginTop={1}>
      {errorMessage}
    </Typography>
  );
};

export default ErrorMessage;
