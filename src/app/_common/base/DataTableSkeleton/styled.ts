'use client';

import { ElementType } from 'react';

import { styled, TableContainer, TableRow } from '@mui/material';

export const DataTableSkeletonContainer: ElementType = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? 'transparent' : '#FFF',
}));

export const DataTableRowHeaderSkeleton: ElementType = styled(TableRow)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? '#121212' : 'transparent',
}));
