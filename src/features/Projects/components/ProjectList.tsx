// React
import { useState, useEffect, useMemo } from 'react';

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
import { ProjectResponse, SprintType } from '../types';
import { ProjectRoles } from '../constant/role';

export type ProjectListProps = {
  projectList?: ProjectResponse[];
};

const ProjectList = ({ projectList }: ProjectListProps) => {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: false, 1: false, 2: false });
  const [currProject, setCurrProject] = useState<string>('');
  const [currSprint, setCurrSprint] = useState<string>('');

  const handleClick = (index: number) => {
    setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
  };

  const router = useRouter();
  const aspath = useMemo(() => router.asPath?.replace('/projects', '').split('/') ?? [], [router]);

  useEffect(() => {
    if (aspath.length > 1) {
      if (currProject !== aspath[1]) setCurrProject(aspath[1]);
      if (aspath.length > 2) {
        if (currSprint !== aspath[2]) setCurrSprint(aspath[2]);
      } else setCurrSprint('');
    } else {
      if (currProject) setCurrProject('');
      if (currSprint) setCurrSprint('');
    }
  }, [aspath, currProject, currSprint]);

  useEffect(() => {
    const indexAt = projectList?.findIndex((p) => p.id === currProject) ?? -1;
    if (indexAt !== -1 && currSprint) setOpen((o) => ({ ...o, [indexAt]: true }));
  }, [currProject, currSprint, projectList]);

  return (
    <List>
      {projectList &&
        projectList.map(({ id, name, sprints, asRole }, index) => (
          <ListContainer key={id} sx={{ px: 2 }}>
            <ListItemContainer>
              <ListButton disableTouchRipple className="cursor-default" selected={currProject === id}>
                <Icon className="cursor-pointer" sx={{ mr: 1 }} onClick={() => handleClick(index)}>
                  {sprints && sprints.length > 0 ? open[index] ? <ExpandLess /> : <ExpandMore /> : null}
                </Icon>
                <Link href={`/projects/${id}`} passHref>
                  <ListItemText className="cursor-pointer" primary={name} />
                </Link>
                <TableAction hideView hideDelete hideEdit>
                  {asRole === ProjectRoles.ADMIN || asRole === ProjectRoles.MAINTAINER ? (
                    <Link href={`/projects/${id}/setting`} passHref>
                      <MenuItem>Settings</MenuItem>
                    </Link>
                  ) : (
                    <Link href={`/projects/${id}/member`} passHref>
                      <MenuItem>Member</MenuItem>
                    </Link>
                  )}
                </TableAction>
              </ListButton>
            </ListItemContainer>
            <Collapse in={open[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {sprints.map((sprint: SprintType) => (
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
