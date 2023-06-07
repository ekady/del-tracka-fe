// React
import { useState, MouseEvent, memo, useCallback } from 'react';

// MUI Components
import {
  IconButton,
  Menu,
  MenuItem,
  Fade,
  ListSubheader,
  Divider,
  IconButtonProps,
  MenuItemProps,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import { FunctionVoid, FunctionVoidWithParams } from '@/common/types';

export interface TableMenuSelectionProps {
  list: Record<string, string>[];
  currentValue?: string;
  handleChange?: FunctionVoidWithParams<string>;
  IconProps?: IconButtonProps;
  MenuItemProps?: MenuItemProps;
  title?: string;
  itemText?: string;
  itemValue?: string;
}

const TableMenuSelection = ({
  list,
  currentValue,
  handleChange,
  IconProps,
  MenuItemProps,
  title,
  itemText = 'text',
  itemValue = 'value',
}: TableMenuSelectionProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenClose = useCallback(
    (event?: MouseEvent<HTMLElement>): void => {
      if (event && !anchorEl) {
        setAnchorEl(event.currentTarget);
      } else setAnchorEl(null);
    },
    [anchorEl],
  );

  const handleClick = useCallback(
    (value: string): FunctionVoid => {
      return () => {
        handleOpenClose();
        handleChange?.(value);
      };
    },
    [handleChange, handleOpenClose],
  );

  return (
    <>
      <IconButton
        id="fade-button"
        aria-controls={anchorEl ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        onClick={handleOpenClose}
        {...IconProps}
      >
        {anchorEl ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{ 'aria-labelledby': 'fade-button' }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClick={handleOpenClose}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <ListSubheader component="div" sx={{ lineHeight: '30px' }}>
          {title ? title : 'Change to'}
        </ListSubheader>
        <Divider />
        {list.map((item) => (
          <MenuItem
            onClick={handleClick(item[itemValue] ?? '')}
            key={item[itemValue]}
            disabled={item[itemValue] === currentValue}
            {...MenuItemProps}
          >
            {item[itemText]}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default memo(TableMenuSelection);
