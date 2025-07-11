'use client';

import { useState, MouseEvent, memo, useCallback } from 'react';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
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

import { TFunctionVoid, TFunctionVoidWithParams } from '@/app/_common/types';

export interface ITableMenuSelectionProps {
  list: Record<string, string>[];
  currentValue?: string;
  handleChange?: TFunctionVoidWithParams<string>;
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
}: ITableMenuSelectionProps) => {
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
    (value: string): TFunctionVoid => {
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
          {title || 'Change to'}
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
