'use client';

import { StyledComponent } from '@emotion/styled';
import { styled } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export const TextFieldStyled: StyledComponent<TextFieldProps> = styled(TextField)(({ theme }) => ({
  marginTop: 0,
  fontSize: 14,

  '& .MuiInputBase-formControl': {
    backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : 'white',
  },
}));
