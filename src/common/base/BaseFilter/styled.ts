import { ElementType } from 'react';

// MUI
import { Box, Grid, styled, Typography } from '@mui/material';

export const FilterContainer: ElementType = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: 24,
  paddingRight: 24,
  paddingBottom: 16,
  paddingTop: 16,
  background: theme.palette.mode === 'dark' ? 'transparent' : 'white',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? '#737373' : '#ddd',
  borderRadius: 16,
  width: '100%',

  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    gap: 12,
  },
}));

export const FilterText: ElementType = styled(Typography)(() => ({
  flexGrow: 1,
}));

export const FilterListSelectContainer: ElementType = styled(Grid)(({ theme }) => ({
  width: '100%',
}));

export const FilterSelectContainer: ElementType = styled(Grid)(({ theme }) => ({
  minWidth: '100%',

  [theme.breakpoints.up('md')]: {
    minWidth: 200,
  },
}));
