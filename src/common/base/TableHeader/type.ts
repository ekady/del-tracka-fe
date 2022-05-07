import { ReactNode } from 'react';

import { TextFieldProps } from '@mui/material';

export interface TableHeaderProps {
  TextFieldProps?: TextFieldProps;
  isUsingSearch?: boolean;
  header?: ReactNode;
}
