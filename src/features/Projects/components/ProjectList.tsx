// React
import { useState, useEffect, useMemo, useCallback } from 'react';

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
import { IProjectWithPermissions, ISprintResponse } from '../interfaces';

export interface ProjectListProps {
  projectList?: IProjectWithPermissions[];
}

const ProjectList = ({ projectList }: ProjectListProps) => {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: false, 1: false, 2: false });
  const [currProject, setCurrProject] = useState<string>('');
  const [currSprint, setCurrSprint] = useState<string>('');

  const handleClick = useCallback((index: number) => {
    setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
  }, []);

  const router = useRouter();
  const aspath = useMemo(() => router.asPath?.replace('/app/projects', '').split('/') ?? [], [router]);

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
    const indexAt = projectList?.findIndex((p) => p.shortId === currProject) ?? -1;
    if (indexAt !== -1 && currSprint) setOpen((o) => ({ ...o, [indexAt]: true }));
  }, [currProject, currSprint, projectList]);

  return (
    <List>
      {projectList &&
        projectList.map(({ shortId, name, stages, rolePermissions }, index) => (
          <ListContainer key={shortId}>
            <ListItemContainer>
              <ListButton disableTouchRipple className="cursor-default" selected={currProject === shortId}>
                {stages && stages.length > 0 ? (
                  <Icon className="cursor-pointer" sx={{ mr: 1 }} onClick={() => handleClick(index)}>
                    {open[index] ? <ExpandLess /> : <ExpandMore />}
                  </Icon>
                ) : (
                  <Icon className="cursor-pointer" sx={{ mr: 1 }} />
                )}
                <Link href={`/app/projects/${shortId}`} passHref>
                  <ListItemText className="cursor-pointer" primary={name} />
                </Link>
                <TableAction hideView hideDelete hideEdit>
                  {rolePermissions.PROJECT.update ? (
                    <Link href={`/app/projects/${shortId}/setting`} passHref>
                      <MenuItem>Settings</MenuItem>
                    </Link>
                  ) : (
                    <Link href={`/app/projects/${shortId}/member`} passHref>
                      <MenuItem>Member</MenuItem>
                    </Link>
                  )}
                </TableAction>
              </ListButton>
            </ListItemContainer>
            {stages && stages.length > 0 && (
              <Collapse in={open[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {stages.map((sprint: ISprintResponse) => (
                    <ListButton
                      key={sprint.shortId}
                      disableTouchRipple
                      selected={currProject === shortId && currSprint === sprint.shortId}
                      sx={{ pl: 4, marginBottom: '4px' }}
                    >
                      <Link href={`/app/projects/${shortId}/${sprint.shortId}`} passHref>
                        <ListItemText primary={sprint.name} />
                      </Link>
                    </ListButton>
                  ))}
                </List>
              </Collapse>
            )}
          </ListContainer>
        ))}
    </List>
  );
};

export default ProjectList;
