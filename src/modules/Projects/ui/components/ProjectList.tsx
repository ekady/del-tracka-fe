// React
import { useState } from 'react';

// Next
import Link from 'next/link';
import { useRouter } from 'next/router';

// MUI Components
import { Box, Collapse, Icon, List, ListItemButton, ListItemText } from '@mui/material';

// MUI Icons
import { ExpandLess, ExpandMore } from '@mui/icons-material';

// Local Components
import { TableAction } from '@/common/components/base';

type indexable = {
  [key: string | number]: boolean;
};

type TypeSprint = {
  id: string;
  name: string;
};

export type TypeProject = {
  id: string;
  name: string;
  sprints: TypeSprint[];
};

export interface ProjectListProps {
  projectList?: TypeProject[];
  handleEdit?: () => void;
  handleDelete?: () => void;
}

export default function ProjectList({ projectList, handleDelete, handleEdit }: ProjectListProps) {
  const [open, setOpen] = useState<indexable>({ 0: false, 1: false, 2: false });

  const handleClick = (index: number) => {
    setOpen({ ...open, [index]: !open[index] });
  };

  const router = useRouter();
  // const pathname = router.pathname?.replace('/projects', '').split('/') ?? [];
  const aspath = router.asPath?.replace('/projects', '').split('/') ?? [];

  let currentProjectPath = '';
  // let currentSprintPath = '';
  if (aspath.length > 1) {
    currentProjectPath = aspath[1];
  }

  return (
    <List>
      {projectList &&
        projectList.map(({ id, name, sprints }, index) => (
          <Box key={id}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemButton
                disableTouchRipple
                className="cursor-default"
                sx={{ backgroundColor: currentProjectPath === id ? '#ddd' : '#fff' }}
              >
                <Icon className="cursor-pointer" sx={{ mr: 1 }} onClick={() => handleClick(index)}>
                  {open[index] ? <ExpandLess /> : <ExpandMore />}
                </Icon>
                <Link href={`/projects/${id}`} passHref>
                  <ListItemText className="cursor-pointer" primary={name} />
                </Link>
                <TableAction hideView handleEdit={handleEdit} handleDelete={handleDelete} />
              </ListItemButton>
            </Box>
            <Collapse in={open[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {sprints.map((sprint) => (
                  <ListItemButton disableTouchRipple key={sprint.id} sx={{ pl: 4 }}>
                    <ListItemText primary={sprint.name} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
    </List>
  );
}
