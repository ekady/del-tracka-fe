'use client';

// MUI Component
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Toast
import 'react-toastify/dist/ReactToastify.css';

// Charts
import 'chart.js/auto';

// Hooks
import useTheme from '@/app/_common/hooks/useTheme.hook';
import { useThemeStore } from '@/app/_common/store/theme.store';
import { IPropsChildren } from '@/app/_common/types';

const LayoutTheme = ({ children }: IPropsChildren) => {
  const themeMode = useThemeStore((state) => state.mode);
  const theme = useTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
    </ThemeProvider>
  );
};

export default LayoutTheme;
