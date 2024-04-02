// React
import { useState, useEffect, useMemo, useCallback } from 'react';

// Next
import Link from 'next/link';
import { useRouter } from 'next/router';

// MUI Components
import Collapse from '@mui/material/Collapse';
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';

// MUI Icons
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// Local Components
import { TableAction } from '@/common/base';
import { ListButton, ListContainer, ListItemContainer } from '@/common/base/List/styled';

// Types
import { IProjectWithPermissions, ISprintResponse } from '../interfaces';

export interface IProjectListProps {
  projectList?: IProjectWithPermissions[];
}

const ProjectList = ({ projectList }: IProjectListProps) => {
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
      {projectList?.map(({ shortId, name, stages, rolePermissions }, index) => (
        <ListContainer key={shortId}>
          <ListItemContainer>
            <ListButton disableTouchRipple className="cursor-default" selected={currProject === shortId}>
              {stages?.length > 0 ? (
                <Icon className="cursor-pointer" sx={{ mr: 1 }} onClick={() => handleClick(index)}>
                  {open[index] ? <ExpandLess /> : <ExpandMore />}
                </Icon>
              ) : (
                <Icon className="cursor-pointer" sx={{ mr: 1 }} />
              )}
              <Link href={`/app/projects/${shortId}`} passHref style={{ flexGrow: 1 }}>
                <ListItemText className="cursor-pointer" primary={name} />
              </Link>
              <TableAction hideView hideDelete hideEdit>
                {rolePermissions.PROJECT.update || rolePermissions.MEMBER.update ? (
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
          {stages?.length > 0 && (
            <Collapse in={open[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {stages.map((sprint: ISprintResponse) => (
                  <Link href={`/app/projects/${shortId}/${sprint.shortId}`} key={sprint.shortId} passHref>
                    <ListButton
                      disableTouchRipple
                      selected={currProject === shortId && currSprint === sprint.shortId}
                      sx={{ pl: 4, marginBottom: '4px' }}
                    >
                      <ListItemText primary={sprint.name} />
                    </ListButton>
                  </Link>
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
