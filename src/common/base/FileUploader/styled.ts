// MUI Components
import { Box, IconButton, styled } from '@mui/material';

export const InputFile = styled('input')(() => ({
  display: 'none',
}));

export const FilesUploadContainer = styled(Box)(() => ({
  component: 'div',
  border: '2px dashed',
  overflow: 'hidden',
  boxSizing: 'border-box',
}));

export const FilesContainer = styled(Box)(() => ({
  height: '80%',
  width: '100%',
  overflow: 'auto',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'start',
  justifyContent: 'start',
}));

export const ImageContainer = styled(Box)(() => ({
  position: 'relative',
  background: 'lightgray',

  '& > span > img': {
    textAlign: 'center',
    lineHeight: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
}));

export const FileTextContainer = styled(Box)(() => ({
  marginTop: 5,
  overflowWrap: 'break-word',
  hyphens: 'auto',
}));

export const ButtonContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
}));

export const RemoveIconButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: 2,
  right: 2,
  color: 'white',
  backgroundColor: '#00000057',
}));
