import { Paper, styled, Typography } from '@mui/material';

export const PaperActivities = styled(Paper)(() => ({
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

export const TypographyActivities = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: 14,
  letterSpacing: 0.5,
  color: '#4F4F4F',
  marginBottom: 10,
}));

export const PaperIssues = styled(Paper)(() => ({
  width: '100%',
  height: 250,
  paddingLeft: 15,
  paddingRight: 15,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  boxShadow: 'none',
  border: '1px solid #ddd',
  borderRadius: '20px',
}));

export const TypographyIssues = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: 14,
  letterSpacing: 0.5,
  color: '#4F4F4F',
  marginBottom: 10,
}));

export const PaperTotal = styled(Paper)(() => ({
  width: '100%',
  padding: 15,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: 'none',
  border: '1px solid #ddd',
  borderRadius: '20px',
}));
