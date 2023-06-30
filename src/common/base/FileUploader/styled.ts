import { ElementType } from 'react';

// MUI Components
import { Box, IconButton, styled } from '@mui/material';

export const InputFile: ElementType = styled('input')(() => ({
  display: 'none',
}));

export const FilesUploadContainer: ElementType = styled(Box)(() => ({
  component: 'div',
  border: '2px dashed',
  overflow: 'hidden',
  boxSizing: 'border-box',
}));

export const FilesContainer: ElementType = styled(Box)(() => ({
  height: '80%',
  width: '100%',
  overflow: 'auto',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'start',
  justifyContent: 'space-around',
}));

export const ImageContainer: ElementType = styled(Box)(() => ({
  position: 'relative',
  background: 'lightgray',

  '& > span > img': {
    textAlign: 'center',
    lineHeight: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
}));

export const FileTextContainer: ElementType = styled(Box)(() => ({
  marginTop: 5,
  overflowWrap: 'break-word',
  hyphens: 'auto',
}));

export const ButtonContainer: ElementType = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
}));

export const RemoveIconButton: ElementType = styled(IconButton)(() => ({
  position: 'absolute',
  top: 2,
  right: 2,
  color: 'white',
  backgroundColor: '#00000057',
  '&:hover': {
    backgroundColor: '#00000026',
  },
}));
