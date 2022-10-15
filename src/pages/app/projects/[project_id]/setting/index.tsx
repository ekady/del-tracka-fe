// React
import { ReactElement, useEffect, useState } from 'react';

// Next
import { useRouter } from 'next/router';

// MUI
import { Box, CircularProgress, Collapse, Icon, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

// Components
import { LayoutDefault } from '@/common/layout';
import { ProjectInformation, ProjectMembers, ProjectOtherSetting } from '@/features/projects/components/ProjectSetting';
import LayoutProject from '@/features/projects/layout/LayoutProject';
import { ListButton, ListContainer, ListContentContainer, ListItemContainer } from '@/common/base/List/styled';
import { ProjectRoles } from '@/features/projects/constant/role';

// Hooks
import useProjectId from '@/features/projects/hooks/useProjectId';

const menus = [
  { menu: 'Project Information', component: <ProjectInformation />, isLazyLoad: false },
  { menu: 'Member', component: <ProjectMembers />, isLazyLoad: false },
  { menu: 'Other', component: <ProjectOtherSetting />, isLazyLoad: true },
];

const ProjectSettingPage = () => {
  const router = useRouter();
  const { data, projectId } = useProjectId();
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: false, 1: false, 2: false });

  const handleClick = (index: number) => {
    return () => {
      setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
    };
  };

  useEffect(() => {
    setOpen({ 0: false, 1: false, 2: false });
  }, [router]);

  useEffect(() => {
    if (data?.data.role && data?.data.role !== ProjectRoles.OWNER) router.push(`/app/projects/${projectId}/member`);
  }, [data, projectId, router]);

  if (data?.data.role !== ProjectRoles.OWNER)
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100%" marginTop={5}>
        <CircularProgress />
      </Box>
    );

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
