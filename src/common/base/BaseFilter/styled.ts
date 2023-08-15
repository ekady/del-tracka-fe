import { ElementType } from 'react';

// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

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

export const FilterListSelectContainer: ElementType = styled(Grid)(() => ({
  width: '100%',
}));

export const FilterSelectContainer: ElementType = styled(Grid)(({ theme }) => ({
  minWidth: '100%',

  [theme.breakpoints.up('md')]: {
    minWidth: 200,
  },
}));
