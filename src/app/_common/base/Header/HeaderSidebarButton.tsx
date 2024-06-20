'use client';

import Image from 'next/image';

import MenuIcon from '@mui/icons-material/Menu';

import { IconLogo } from '@/app/_common/icons';
import { useGeneralStore } from '@/app/_common/store/general.store';

import { LogoContainer, MenuIconButtonContainer, TitleContainer } from './styled';

const HeaderSidebarButton = () => {
  const isSidebarOpen = useGeneralStore((state) => state.isSidebarOpen);
  const toggleSidebar = useGeneralStore((state) => state.setSidebar);

  return (
    <TitleContainer>
      <MenuIconButtonContainer onClick={() => toggleSidebar(!isSidebarOpen)} color="inherit" aria-label="menu">
        <MenuIcon />
      </MenuIconButtonContainer>
      <LogoContainer>
        <Image src={IconLogo} width={70} alt="logo" priority />
      </LogoContainer>
    </TitleContainer>
  );
};

export default HeaderSidebarButton;
