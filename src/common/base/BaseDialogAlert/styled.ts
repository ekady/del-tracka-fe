// MUI Components
import { Box, DialogActions as DialogActionsMUI, DialogTitle as DialogTitleMUI, styled } from '@mui/material';

// MUI Icons
import { CheckCircle as CheckCircleMUI, Delete as DeleteMUI, Warning as WarningMUI } from '@mui/icons-material';

const iconStyle = { fontSize: 125, my: 3 };

export const DialogContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 2,
  minHeight: 100,
  minWidth: 300,
}));

export const DialogTitle = styled(DialogTitleMUI)(() => ({
  my: 1,
  padding: 0,
  fontSize: 20,
  fontWeight: 'bold',
}));

export const TextContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const DialogActions = styled(DialogActionsMUI)(() => ({
  mb: 3,
  px: 3,
  mt: 5,
}));

export const Warning = styled(WarningMUI)(({ theme }) => ({
  ...iconStyle,
  color: theme.palette.warning.main,
}));

export const Delete = styled(DeleteMUI)(({ theme }) => ({
  ...iconStyle,
  color: theme.palette.error.main,
}));

export const CheckCircle = styled(CheckCircleMUI)(({ theme }) => ({
  ...iconStyle,
  color: theme.palette.success.main,
}));
