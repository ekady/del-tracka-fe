'use client';

import { ElementType } from 'react';

import { styled } from '@mui/material/styles';
import { DataGrid as DataGridMUI } from '@mui/x-data-grid';

export const DataGridStyled: ElementType = styled(DataGridMUI)(({ theme }) => ({
  border: 'none',

  '& .MuiDataGrid-main > div:first-of-type': {
    zIndex: 1,
  },

  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold',
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'transparent',
  },
  '& .MuiDataGrid-virtualScrollerRenderZone': {
    backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : 'white',
  },
  '& .MuiDataGrid-cell': {
    borderColor: 'transparent',
    py: '16px',
  },
}));
