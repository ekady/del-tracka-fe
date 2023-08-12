import { ThemeProvider } from '@mui/material/styles';

import { useAppSelector } from '@/common/store';
import { selectColorTheme } from '@/common/store/selector';
import useTheme from '@/common/hooks/useTheme';

import { IPropsChildren } from '@/common/types';

const LayoutTheme = ({ children }: IPropsChildren) => {
  const colorTheme = useAppSelector(selectColorTheme);
  const theme = useTheme(colorTheme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default LayoutTheme;
