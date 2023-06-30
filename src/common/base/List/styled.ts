import { ElementType } from 'react';

import { Box, Container, ListItemButton, styled } from '@mui/material';

export const ListButton: ElementType = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ selected, theme }) => ({
  borderRadius: 8,
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? '#737373' : '#ddd',
  cursor: 'pointer',
  ...(theme.palette.mode === 'dark'
    ? {
        backgroundColor: selected ? '#484848' : 'initial',
        '&:hover': {
          backgroundColor: selected ? '#484848' : 'initial',
        },
      }
    : {
        backgroundColor: selected ? '#c9d5dd' : '#fff',
        '&:hover': {
          backgroundColor: selected ? '#c9d5dd' : '#e9f1f7',
        },
      }),
}));

export const ListContainer: ElementType = styled(Box)(() => ({
  marginBottom: 8,
}));

export const ListItemContainer: ElementType = styled(Box)(() => ({
  marginBottom: 4,
}));

export const ListContentContainer: ElementType = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : 'white',
  paddingTop: 12,
  paddingBottom: 12,
  borderRadius: 2,
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? '#737373' : '#ddd',
}));
