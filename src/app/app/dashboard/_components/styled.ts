'use client';

import { ElementType } from 'react';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const PaperActivities: ElementType = styled(Paper)(() => ({
  width: '100%',
  height: 400,
  padding: 15,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  boxShadow: 'none',
  border: '1px solid #ddd',
  borderRadius: '20px',
}));

export const TypographyActivities: ElementType = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: 14,
  letterSpacing: 0.5,
  marginBottom: 10,
}));

export const TypographyTasks: ElementType = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: 14,
  letterSpacing: 0.5,
  marginBottom: 10,
}));

export const TypographyTotalProject: ElementType = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontWeight: 'bold',
}));

export const TypographyTotalTask: ElementType = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
}));
