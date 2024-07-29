'use client';

import { ReactNode } from 'react';

import { AppBar } from './styled';
import { useGeneralStore } from '../../store/general.store';

export interface IHeaderAppBarProps {
  isUsingSidebar?: boolean;
  children: ReactNode;
}

const HeaderAppBar = ({ isUsingSidebar, children }: IHeaderAppBarProps) => {
  const isSidebarOpen = useGeneralStore((state) => state.isSidebarOpen);

  return (
    <AppBar color="inherit" open={isSidebarOpen} sidebar={isUsingSidebar}>
      {children}
    </AppBar>
  );
};

export default HeaderAppBar;
