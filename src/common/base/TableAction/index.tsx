// React
import { memo, useCallback, useState } from 'react';

// MUI Components
import { Box, IconButton, Menu, MenuItem } from '@mui/material';

// MUI Icons
import { MoreVert as MoreVertIcon } from '@mui/icons-material/';

import { FunctionVoid, IPropsChildren } from '@/common/types';

export interface TableActionProps extends IPropsChildren {
  hideView?: boolean;
  handleView?: FunctionVoid;
  hideDelete?: boolean;
  handleDelete?: FunctionVoid;
  hideEdit?: boolean;
  handleEdit?: FunctionVoid;
}

const TableAction = ({
  children,
  handleDelete,
  handleEdit,
  handleView,
  hideDelete,
  hideEdit,
  hideView,
}: TableActionProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = useCallback((fn?: FunctionVoid): void => {
    setAnchorEl(null);
    fn && fn();
  }, []);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  }, []);

  return (
    <>
      <IconButton
        id="demo-positioned-button"
        aria-controls={Boolean(anchorEl) ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
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
