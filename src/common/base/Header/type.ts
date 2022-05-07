import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  sidebar?: boolean;
}

export interface HeaderProps {
  isSignIn: boolean;
  showMenu: boolean;
  usingSidebar?: boolean;
}
