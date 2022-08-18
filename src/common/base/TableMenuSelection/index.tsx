// React
import { useState, MouseEvent } from 'react';

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

import { FunctionVoidWithParams, Indexable } from '@/common/types';

export type TableMenuSelectionProps = {
  list: Indexable<string, string>[];
  currentValue?: string;
  handleChange?: FunctionVoidWithParams<string>;
  IconProps?: IconButtonProps;
  MenuItemProps?: MenuItemProps;
  title?: string;
  itemText?: string;
  itemValue?: string;
};

const TableMenuSelection = ({
  list,
  currentValue,
  handleChange,
  IconProps,
  MenuItemProps,
  title,
  itemText,
  itemValue,
}: TableMenuSelectionProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const text = itemText ?? 'text';
  const value = itemValue ?? 'value';

  const handleOpenClose = (event?: MouseEvent<HTMLElement>) => {
    if (event && !open) {
      setAnchorEl(event.currentTarget);
    } else setAnchorEl(null);
  };
  const handleClick = (value: string) => {
    return () => {
      handleOpenClose();
      handleChange && handleChange(value);
    };
  };

  return (
    <>
      <IconButton
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpenClose}
        {...IconProps}
      >
        {open ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{ 'aria-labelledby': 'fade-button' }}
        anchorEl={anchorEl}
        open={open}
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
        {list.map((item, index) => (
          <MenuItem
            onClick={handleClick(item[value] ?? '')}
            key={`${item[value]}&${index}`}
            disabled={item[value] === currentValue}
            {...MenuItemProps}
          >
            {item[text]}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default TableMenuSelection;
