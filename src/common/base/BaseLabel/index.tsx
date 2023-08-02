import { InputLabel, InputLabelProps } from '@mui/material';

import { useAppSelector } from '@/common/store';
import { selectColorTheme } from '@/common/store/selector';
import { IPropsChildren } from '@/common/types';

export interface BaseLabelProps extends InputLabelProps, IPropsChildren {}

const BaseLabel = ({ children, ...labelProps }: InputLabelProps) => {
  const isDark = useAppSelector(selectColorTheme) === 'dark';
  return (
    <InputLabel margin="dense" sx={{ fontSize: '0.875rem', color: isDark ? 'white' : 'black' }} {...labelProps}>
      {children}
    </InputLabel>
  );
};

export default BaseLabel;
