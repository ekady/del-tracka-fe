// React
import { ReactElement, useCallback, useEffect, useState } from 'react';

// Next
import { useRouter } from 'next/router';

// MUI
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Icon from '@mui/material/Icon';
import ListItemText from '@mui/material/ListItemText';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// Components
import { LayoutDefault } from '@/common/layout';
import { ProjectInformation, ProjectMembers, ProjectOtherSetting } from '@/features/projects/components/ProjectSetting';
import LayoutProject from '@/features/projects/layout/LayoutProject';
import { ListButton, ListContainer, ListContentContainer, ListItemContainer } from '@/common/base/List/styled';

// Hooks
import useProjectId from '@/features/projects/hooks/useProjectId';
import { useProjectBreadcrumb } from '@/features/projects/hooks/useProjectBreadcrumb';

const menus = [
  { menu: 'Project Information', component: <ProjectInformation />, isLazyLoad: false },
  { menu: 'Member', component: <ProjectMembers />, isLazyLoad: false },
  { menu: 'Other', component: <ProjectOtherSetting />, isLazyLoad: true },
];

const ProjectSettingPage = () => {
  const router = useRouter();
  const { data, projectId } = useProjectId();
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: false, 1: false, 2: false });

  useProjectBreadcrumb({ '[project_id]': data?.data?.name ?? '' });

  const handleClick = useCallback((index: number) => {
    return () => {
      setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
    };
  }, []);

  useEffect(() => {
    setOpen({ 0: false, 1: false, 2: false });
  }, [router]);

  useEffect(() => {
    if (projectId && data?.data.rolePermissions && !data?.data.rolePermissions.PROJECT.update)
      router.push(`/app/projects/${projectId}/member`).catch(() => {
        //
      });
  }, [data, projectId, router]);

  if (!data?.data.rolePermissions.PROJECT.update)
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100%" marginTop={5}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
      {menus.map(({ menu, component, isLazyLoad }, index) => (
        <ListContainer key={menu}>
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
