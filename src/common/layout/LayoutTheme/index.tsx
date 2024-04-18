import dynamic from 'next/dynamic';

// MUI Date Picker Localization
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useAppSelector } from '@/common/store';
import { selectColorTheme } from '@/common/store/selector';
import useTheme from '@/common/hooks/useTheme';

// Toast
import 'react-toastify/dist/ReactToastify.css';

// Charts
import 'chart.js/auto';

import { IPropsChildren } from '@/common/types';

const ThemeProvider = dynamic(() => import('@mui/material/styles/ThemeProvider'), { ssr: false });

const LayoutTheme = ({ children }: IPropsChildren) => {
  const colorTheme = useAppSelector(selectColorTheme);
  const theme = useTheme(colorTheme);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </LocalizationProvider>
  );
};

export default LayoutTheme;
