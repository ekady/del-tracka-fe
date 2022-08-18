// React
import { ReactElement, useEffect, useState } from 'react';

// MUI
import { Collapse, Icon, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

// Components
import { LayoutDefault } from '@/common/layout';
import { ProjectInformation, ProjectMembers, ProjectOtherSetting } from '@/features/Projects/components/ProjectSetting';
import LayoutProject from '@/features/Projects/layout/LayoutProject';
import { ListButton, ListContainer, ListContentContainer, ListItemContainer } from '@/common/base/List/styled';

import { Indexable } from '@/common/types';
import { useRouter } from 'next/router';

const menus = [
  { menu: 'Project Information', component: <ProjectInformation />, isLazyLoad: false },
  { menu: 'Member', component: <ProjectMembers />, isLazyLoad: false },
  { menu: 'Other', component: <ProjectOtherSetting />, isLazyLoad: true },
];

const ProjectSettingPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState<Indexable<number, boolean>>({ 0: false, 1: false, 2: false });

  const handleClick = (index: number) => {
    return () => {
      setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
    };
  };

  useEffect(() => {
    setOpen({ 0: false, 1: false, 2: false });
  }, [router]);
  return (
    <>
      {menus.map(({ menu, component, isLazyLoad }, index) => (
        <ListContainer key={`${menu}-${index}`}>
          <ListItemContainer>
            <ListButton disableTouchRipple onClick={handleClick(index)}>
              <ListItemText className="cursor-pointer" primary={menu} />
              <Icon className="cursor-pointer" sx={{ mr: 1 }}>
                {open[index] ? <ExpandLess /> : <ExpandMore />}
              </Icon>
            </ListButton>
          </ListItemContainer>
          <Collapse in={open[index]} timeout="auto" mountOnEnter={isLazyLoad}>
            <ListContentContainer maxWidth={false}>{component}</ListContentContainer>
          </Collapse>
        </ListContainer>
      ))}
    </>
  );
};

ProjectSettingPage.getLayout = (page: ReactElement) => {
  return (
    <LayoutDefault>
      <LayoutProject hideMenu content={page} />
    </LayoutDefault>
  );
};

export default ProjectSettingPage;
