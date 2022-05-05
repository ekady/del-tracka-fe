// React
import { useState, useEffect } from 'react';

// Next
import Link from 'next/link';
import { useRouter } from 'next/router';

// MUI Components
import { Box, Collapse, Icon, List, ListItemButton as ListItemButtonMUI, ListItemText, MenuItem, styled } from '@mui/material';

// MUI Icons
import { ExpandLess, ExpandMore } from '@mui/icons-material';

// Local Components
import { TableAction } from '@/common/components/base';

const ListItemButton = styled(ListItemButtonMUI, {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ selected }) => ({
  borderRadius: 8,
  border: '1px solid #ddd',
  cursor: 'pointer',
  backgroundColor: selected ? '#c9d5dd' : '#fff',
  '&:hover': {
    backgroundColor: selected ? '#c9d5dd' : '#e9f1f7',
  },
}));

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
}

export default function ProjectList({ projectList }: ProjectListProps) {
  const [open, setOpen] = useState<indexable>({ 0: false, 1: false, 2: false });
  const [currProject, setCurrProject] = useState<string>('');
  const [currSprint, setCurrSprint] = useState<string>('');

  const handleClick = (index: number) => {
    setOpen({ ...open, [index]: !open[index] });
  };

  const router = useRouter();
  const aspath = router.asPath?.replace('/projects', '').split('/') ?? [];

  if (aspath.length > 1) {
    if (currProject !== aspath[1]) setCurrProject(aspath[1]);
    if (aspath.length > 2) {
      if (currSprint !== aspath[2]) setCurrSprint(aspath[2]);
    }
  }

  useEffect(() => {
    const indexAt = projectList?.findIndex((p) => p.id === currProject) ?? -1;
    if (indexAt !== -1) {
      setOpen((o) => {
        const closed: indexable = Object.keys(o).reduce((curr, row) => ({ ...curr, [+row]: false }), {});
        return { ...closed, [indexAt]: true };
      });
    }
  }, [currProject, projectList]);

  return (
    <List>
      {projectList &&
        projectList.map(({ id, name, sprints }, index) => (
          <Box key={id} sx={{ marginBottom: '8px' }}>
            <Box sx={{ px: 2, marginBottom: '4px' }}>
              <ListItemButton disableTouchRipple className="cursor-default" selected={currProject === id}>
                <Icon className="cursor-pointer" sx={{ mr: 1 }} onClick={() => handleClick(index)}>
                  {open[index] ? <ExpandLess /> : <ExpandMore />}
                </Icon>
                <Link href={`/projects/${id}`} passHref>
                  <ListItemText className="cursor-pointer" primary={name} />
                </Link>
                <TableAction hideView hideDelete hideEdit>
                  <Link href={`/projects/${id}/setting`} passHref>
                    <MenuItem>Settings</MenuItem>
                  </Link>
                  <Link href={`/projects/${id}/member`} passHref>
                    <MenuItem>Member</MenuItem>
                  </Link>
                </TableAction>
              </ListItemButton>
            </Box>
            <Collapse in={open[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ px: 2 }}>
                {sprints.map((sprint) => (
                  <ListItemButton
                    key={sprint.id}
                    disableTouchRipple
                    selected={currProject === id && currSprint === sprint.id}
                    sx={{ pl: 4, marginBottom: '4px' }}
                  >
                    <Link href={`/projects/${id}/${sprint.id}`} passHref>
                      <ListItemText primary={sprint.name} />
                    </Link>
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
    </List>
  );
}
