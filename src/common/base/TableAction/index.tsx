// React
import { memo, useCallback, useState } from 'react';

// MUI Components
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

// MUI Icons
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { TFunctionVoid, IPropsChildren } from '@/common/types';

export interface ITableActionProps extends IPropsChildren {
  hideView?: boolean;
  handleView?: TFunctionVoid;
  hideDelete?: boolean;
  handleDelete?: TFunctionVoid;
  hideEdit?: boolean;
  handleEdit?: TFunctionVoid;
}

const TableAction = ({
  children,
  handleDelete,
  handleEdit,
  handleView,
  hideDelete,
  hideEdit,
  hideView,
}: ITableActionProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = useCallback((fn?: TFunctionVoid): void => {
    setAnchorEl(null);
    fn?.();
  }, []);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  }, []);

  return (
    <>
      <IconButton
        id="demo-positioned-button"
        aria-controls={anchorEl ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {!hideView && <MenuItem onClick={() => handleClose(handleView)}>View</MenuItem>}
        {!hideEdit && <MenuItem onClick={() => handleClose(handleEdit)}>Edit</MenuItem>}
        {!hideDelete && <MenuItem onClick={() => handleClose(handleDelete)}>Delete</MenuItem>}
        <Box onClick={() => handleClose()}>{children}</Box>
      </Menu>
    </>
  );
};

export default memo(TableAction);
