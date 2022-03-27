// React
import { ReactNode, useState } from 'react';

// MUI Components
import { IconButton, Menu, MenuItem } from '@mui/material';

// MUI Icons
import { MoreVert as MoreVertIcon } from '@mui/icons-material/';

export type FunctionVoid = () => void;

export interface TableActionProps {
  hideView?: boolean;
  handleView?: FunctionVoid;
  hideDelete?: boolean;
  handleDelete?: FunctionVoid;
  hideEdit?: boolean;
  handleEdit?: FunctionVoid;
  children?: ReactNode;
}

export default function TableAction(props: TableActionProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = (fn?: FunctionVoid) => {
    setAnchorEl(null);
    fn && fn();
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <IconButton
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
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
        {!props.hideView && <MenuItem onClick={() => handleClose(props.handleView)}>View</MenuItem>}
        {!props.hideEdit && <MenuItem onClick={() => handleClose(props.handleEdit)}>Edit</MenuItem>}
        {!props.hideDelete && <MenuItem onClick={() => handleClose(props.handleDelete)}>Delete</MenuItem>}
        {props.children}
      </Menu>
    </div>
  );
}
