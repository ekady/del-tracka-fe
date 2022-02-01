import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1C4D76',
    },
    secondary: {
      main: '#1D84BB',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;