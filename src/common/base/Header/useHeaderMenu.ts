import { MouseEvent, useCallback, useState } from 'react';

const useHeaderMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);

  const handleMenu = useCallback((event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback((): void => {
    setAnchorEl(null);
  }, []);

  const handleSidebar = useCallback((): void => {
    setOpenSidebar(!openSidebar);
  }, [openSidebar]);

  return { openSidebar, anchorEl, handleMenu, handleClose, handleSidebar };
};

export default useHeaderMenu;
