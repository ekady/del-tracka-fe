import CheckCircle from '@mui/icons-material/CheckCircle';
import CircleOutlined from '@mui/icons-material/CircleOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { passwordValidator } from '@/app/auth/sign-up/_helper/passwordConfirm';

export interface IPasswordRequirementProps {
  value: string;
}

const PasswordRequirement = ({ value }: IPasswordRequirementProps) => {
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
