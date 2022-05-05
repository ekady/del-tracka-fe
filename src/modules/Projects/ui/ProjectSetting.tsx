// React
import { useState } from 'react';

// MUI Components
import { Box, Collapse, Container, Icon, ListItemButton as ListItemButtonMUI, ListItemText, styled } from '@mui/material';

// MUI Icons
import { ExpandLess, ExpandMore } from '@mui/icons-material';

// Local Components
import { ProjectInformation, ProjectOtherSetting } from './components';
import ProjectMembers from './components/ProjectSetting/ProjectMembers';

const ListItemButton = styled(ListItemButtonMUI)(() => ({
  borderRadius: 8,
  border: '1px solid #ddd',
  cursor: 'pointer',
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: '#e9f1f7',
  },
}));

type indexable = {
  [key: string | number]: boolean;
};

const menus = [
  { menu: 'Project Information', component: <ProjectInformation /> },
  { menu: 'Member', component: <ProjectMembers /> },
  { menu: 'Other', component: <ProjectOtherSetting /> },
];

export default function ProjectSetting() {
  const [open, setOpen] = useState<indexable>({ 0: false, 1: false, 2: false });

  const handleClick = (index: number) => {
    return () => {
      setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
    };
  };
  return menus.map(({ menu, component }, index) => (
    <Box sx={{ marginBottom: '8px' }} key={`${menu}-${index}`}>
      <Box sx={{ marginBottom: '4px' }}>
        <ListItemButton disableTouchRipple className="cursor-default" onClick={handleClick(index)}>
          <ListItemText className="cursor-pointer" primary={menu} />
          <Icon className="cursor-pointer" sx={{ mr: 1 }}>
            {open[index] ? <ExpandLess /> : <ExpandMore />}
          </Icon>
        </ListItemButton>
      </Box>
      <Collapse in={open[index]} timeout="auto" unmountOnExit>
        <Container maxWidth={false} sx={{ bgcolor: 'white', py: 3, borderRadius: 2, border: '1px solid #ddd' }}>
          {component}
        </Container>
      </Collapse>
    </Box>
  ));
}
