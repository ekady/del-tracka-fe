'use client';

// React
import { ElementType } from 'react';

// MUI Components
import { CheckCircle as CheckCircleMUI, Delete as DeleteMUI, Warning as WarningMUI } from '@mui/icons-material';
import Box from '@mui/material/Box';
import DialogActionsMUI from '@mui/material/DialogActions';
import DialogTitleMUI from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';

// MUI Icons

const iconStyle = { fontSize: 125, my: 3 };

export const DialogContainer: ElementType = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 2,
  minHeight: 100,
  minWidth: 300,
}));

export const DialogTitle: ElementType = styled(DialogTitleMUI)(() => ({
  my: 1,
  padding: 0,
  fontSize: 20,
  fontWeight: 'bold',
}));

export const TextContainer: ElementType = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const DialogActions: ElementType = styled(DialogActionsMUI)(() => ({
  mb: 3,
  px: 3,
  mt: 5,
}));

export const Warning: ElementType = styled(WarningMUI)(({ theme }) => ({
  ...iconStyle,
  color: theme.palette.warning.main,
}));

export const Delete: ElementType = styled(DeleteMUI)(({ theme }) => ({
  ...iconStyle,
  color: theme.palette.error.main,
}));

export const CheckCircle: ElementType = styled(CheckCircleMUI)(({ theme }) => ({
  ...iconStyle,
  color: theme.palette.success.main,
}));
