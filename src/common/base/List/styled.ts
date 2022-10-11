import { Box, Container, ListItemButton, styled } from '@mui/material';

export const ListButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ selected }) => ({
  borderRadius: 8,
  border: '1px solid #ddd',
  cursor: 'pointer',
  backgroundColor: selected ? '#c9d5dd' : '#fff',
  '&:hover': {
    backgroundColor: selected ? '#c9d5dd' : '#e9f1f7',
  },
}));

export const ListContainer = styled(Box)(() => ({
  marginBottom: 8,
}));

export const ListItemContainer = styled(Box)(() => ({
  marginBottom: 4,
}));

export const ListContentContainer = styled(Container)(() => ({
  backgroundColor: 'white',
  paddingTop: 12,
  paddingBottom: 12,
  borderRadius: 2,
  border: '1px solid #ddd',
}));