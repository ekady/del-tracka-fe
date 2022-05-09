// MUI
import { Box, Grid, styled, Typography } from '@mui/material';

export const FilterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: 24,
  paddingRight: 24,
  paddingBottom: 16,
  paddingTop: 16,
  background: 'white',
  border: '1px solid #ddd',
  borderRadius: 16,
  width: '100%',

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

export const FilterText = styled(Typography)(() => ({
  flexGrow: 1,
}));

export const FilterListSelectContainer = styled(Grid)(({ theme }) => ({
  width: '100%',

  [theme.breakpoints.up('md')]: {
    width: 'unset',
  },
}));

export const FilterSelectContainer = styled(Grid)(({ theme }) => ({
  minWidth: '100%',

  [theme.breakpoints.up('md')]: {
    minWidth: 200,
  },
}));
