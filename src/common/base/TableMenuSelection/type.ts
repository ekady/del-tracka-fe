import { IconButtonProps, MenuItemProps } from '@mui/material';

import { IndexableString } from '@/common/types';

export interface TableMenuSelectionProps {
  list: IndexableString[];
  currentValue?: string;
  handleChange?: (value: string) => void;
  IconProps?: IconButtonProps;
  MenuItemProps?: MenuItemProps;
  title?: string;
  itemText?: string;
  itemValue?: string;
}
