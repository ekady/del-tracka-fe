// React
import { useState } from 'react';

// MUI Components
import { Collapse, Icon, ListItemText } from '@mui/material';

// MUI Icons
import { ExpandLess, ExpandMore } from '@mui/icons-material';

// Local Components
import { ProjectInformation, ProjectOtherSetting } from './components';
import ProjectMembers from './components/ProjectSetting/ProjectMembers';
import { ListButton, ListContainer, ListItemContainer, ListContentContainer } from '@/common/base/List/styled';

// Types
import { Indexable } from '@/types';

const menus = [
  { menu: 'Project Information', component: <ProjectInformation /> },
  { menu: 'Member', component: <ProjectMembers /> },
  { menu: 'Other', component: <ProjectOtherSetting /> },
];

const ProjectSetting = () => {
  const [open, setOpen] = useState<Indexable<number, boolean>>({ 0: false, 1: false, 2: false });

  const handleClick = (index: number) => {
    return () => {
      setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
    };
  };
  return (
    <>
      {menus.map(({ menu, component }, index) => (
        <ListContainer key={`${menu}-${index}`}>
          <ListItemContainer>
            <ListButton disableTouchRipple onClick={handleClick(index)}>
              <ListItemText className="cursor-pointer" primary={menu} />
              <Icon className="cursor-pointer" sx={{ mr: 1 }}>
                {open[index] ? <ExpandLess /> : <ExpandMore />}
              </Icon>
            </ListButton>
          </ListItemContainer>
          <Collapse in={open[index]} timeout="auto" unmountOnExit>
            <ListContentContainer maxWidth={false}>{component}</ListContentContainer>
          </Collapse>
        </ListContainer>
      ))}
    </>
  );
};

export default ProjectSetting;
