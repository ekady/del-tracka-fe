// React
import { useState, MouseEvent } from 'react';

// MUI Components
import { IconButton, Menu, MenuItem, Fade, ListSubheader, Divider } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

// Constants
import status from '@/common/constants/status';

export interface ProjectIssueChangeStatusProps {
  currentStatus: string;
  handleChange?: (status: string) => void;
}

export default function ProjectIssueChangeStatus({ currentStatus, handleChange }: ProjectIssueChangeStatusProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenClose = (event?: MouseEvent<HTMLElement>) => {
    if (event && !open) {
      setAnchorEl(event.currentTarget);
    } else setAnchorEl(null);
  };
  const handleClick = (value: string) => {
    handleOpenClose();
    handleChange && handleChange(value);
  };

  return (
    <div>
      <IconButton
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpenClose}
        sx={{ color: status[currentStatus].textColor, pl: 0 }}
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
          Change Status to
        </ListSubheader>
        <Divider />
        {Object.keys(status).map((s) => (
          <MenuItem
            onClick={() => handleClick(status[s].value)}
            key={status[s].name}
            disabled={status[s].value === currentStatus}
          >
            {status[s].name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
