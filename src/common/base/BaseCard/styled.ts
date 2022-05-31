import { Box, Paper, styled } from '@mui/material';

export const CardPaperStyled = styled(Paper)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'start',
  boxShadow: 'none',
  padding: 15,
}));

export const CardBoxStyled = styled(Box)(() => ({
  overflow: 'auto',
  border: '1px solid #ddd',
  borderRadius: '20px',
  background: '#fff',
}));
