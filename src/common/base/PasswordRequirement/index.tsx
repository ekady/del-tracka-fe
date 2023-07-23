import { CheckCircle, CircleOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { passwordValidator } from './helper';

export interface PasswordRequirementProps {
  value: string;
}

const PasswordRequirement = ({ value }: PasswordRequirementProps) => {
  const passwordValidation = passwordValidator(value);

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2}>
        {passwordValidation.isLowerAlpha ? <CheckCircle color="success" /> : <CircleOutlined />}
        <Typography>At least one lowercase</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        {passwordValidation.isUpperAlpha ? <CheckCircle color="success" /> : <CircleOutlined />}
        <Typography>At least one uppercase</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        {passwordValidation.isSymbol ? <CheckCircle color="success" /> : <CircleOutlined />}
        <Typography>At least one symbol</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        {passwordValidation.isNumbered ? <CheckCircle color="success" /> : <CircleOutlined />}
        <Typography>At least one number</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        {passwordValidation.isMinLength ? <CheckCircle color="success" /> : <CircleOutlined />}
        <Typography>Minimum 8 characters</Typography>
      </Box>
    </Box>
  );
};

export default PasswordRequirement;
