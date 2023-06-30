import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const useTheme = (colorTheme: 'light' | 'dark' = 'light') => {
  const isDark = colorTheme === 'dark';

  const theme = createTheme({
    palette: {
      mode: colorTheme,
      primary: {
        main: isDark ? '#A3D5FF' : '#1C4D76',
      },
      secondary: {
        main: '#1D84BB',
      },
      error: {
        main: isDark ? red[300] : red.A400,
      },
    },
  });

  return theme;
};

export default useTheme;
