import { MouseEvent, useCallback, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/common/store';
import { selectSidebarOpen } from '@/common/store/selector';
import { setSideBarOpen } from '@/common/store/general.slice';

const useHeaderMenu = () => {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector(selectSidebarOpen);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = useCallback((event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback((): void => {
    setAnchorEl(null);
  }, []);

  const handleSidebar = useCallback((): void => {
    dispatch(setSideBarOpen(!sidebarOpen));
  }, [dispatch, sidebarOpen]);

  return { sidebarOpen, anchorEl, handleMenu, handleClose, handleSidebar };
};

export default useHeaderMenu;
