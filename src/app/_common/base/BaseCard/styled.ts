'use client';

import { ElementType } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const CardPaperStyled: ElementType = styled(Paper)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'start',
  boxShadow: 'none',
  padding: 15,
}));

export const CardBoxStyled: ElementType = styled(Box)(() => ({
  overflow: 'auto',
  border: '1px solid #ddd',
  borderRadius: '20px',
  background: '#fff',
}));
