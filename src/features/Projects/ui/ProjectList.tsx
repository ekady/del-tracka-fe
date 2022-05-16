// React
import { useState, useEffect } from 'react';

// Next
import Link from 'next/link';
import { useRouter } from 'next/router';

// MUI Components
import { Collapse, Icon, List, ListItemText, MenuItem } from '@mui/material';

// MUI Icons
import { ExpandLess, ExpandMore } from '@mui/icons-material';

// Local Components
import { TableAction } from '@/common/base';
import { ListButton, ListContainer, ListItemContainer } from '@/common/base/List/styled';

// Types
import { ProjectType } from '../types';
import { Indexable } from '@/types';

export type ProjectListProps = {
  projectList?: ProjectType[];
};

const ProjectList = ({ projectList }: ProjectListProps) => {
  const [open, setOpen] = useState<Indexable<number, boolean>>({ 0: false, 1: false, 2: false });
  const [currProject, setCurrProject] = useState<string>('');
  const [currSprint, setCurrSprint] = useState<string>('');

  const handleClick = (index: number) => {
    setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
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
        const closed: Indexable<number, boolean> = Object.keys(o).reduce((curr, row) => ({ ...curr, [+row]: false }), {});
        return { ...closed, [indexAt]: true };
      });
    }
  }, [currProject, projectList]);

  return (
    <List>
      {projectList &&
        projectList.map(({ id, name, sprints }, index) => (
          <ListContainer key={id} sx={{ px: 2 }}>
            <ListItemContainer>
              <ListButton disableTouchRipple className="cursor-default" selected={currProject === id}>
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
              </ListButton>
            </ListItemContainer>
            <Collapse in={open[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {sprints.map((sprint) => (
                  <ListButton
                    key={sprint.id}
                    disableTouchRipple
                    selected={currProject === id && currSprint === sprint.id}
                    sx={{ pl: 4, marginBottom: '4px' }}
                  >
                    <Link href={`/projects/${id}/${sprint.id}`} passHref>
                      <ListItemText primary={sprint.name} />
                    </Link>
                  </ListButton>
                ))}
              </List>
            </Collapse>
          </ListContainer>
        ))}
    </List>
  );
};

export default ProjectList;
