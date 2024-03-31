// React
import { useCallback, useEffect, useState } from 'react';

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
import { ProjectInformation, ProjectMembers, ProjectOtherSetting } from '@/features/projects/components/ProjectSetting';
import { ListButton, ListContainer, ListContentContainer, ListItemContainer } from '@/common/base/List/styled';

// Hooks
import useProjectId from '@/features/projects/hooks/useProjectId';
import { useProjectBreadcrumb } from '@/features/projects/hooks/useProjectBreadcrumb';
import { useGetProfileQuery } from '@/common/store/api.slice';

const menusObj = {
  project: { menu: 'Project Information', component: <ProjectInformation />, isLazyLoad: false },
  member: { menu: 'Member', component: <ProjectMembers />, isLazyLoad: false },
  other: { menu: 'Other', component: <ProjectOtherSetting />, isLazyLoad: true },
};

const ProjectSettingPage = () => {
  const router = useRouter();
  const { data, projectId } = useProjectId();
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: false, 1: false, 2: false });
  const { data: profileData } = useGetProfileQuery();

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
    if (
      projectId &&
      data?.data.rolePermissions &&
      !data?.data.rolePermissions.PROJECT.update &&
      !data?.data.rolePermissions.MEMBER.update
    )
      router.push(`/app/projects/${projectId}/member`).catch(() => {
        //
      });
  }, [data, projectId, router]);

  if (!data?.data.rolePermissions.PROJECT.update && !data?.data.rolePermissions.MEMBER.update)
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100%" marginTop={5}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
      {data?.data?.rolePermissions?.PROJECT?.update && (
        <ListContainer>
          <ListItemContainer>
            <ListButton disableTouchRipple onClick={handleClick(0)}>
              <ListItemText className="cursor-pointer" primary={menusObj.project.menu} />
              <Icon className="cursor-pointer" sx={{ mr: 1 }}>
                {open[0] ? <ExpandLess /> : <ExpandMore />}
              </Icon>
            </ListButton>
          </ListItemContainer>
          <Collapse in={open[0]} timeout="auto" mountOnEnter={menusObj.project.isLazyLoad}>
            <ListContentContainer maxWidth={false}>{menusObj.project.component}</ListContentContainer>
          </Collapse>
        </ListContainer>
      )}

      {data?.data?.rolePermissions?.MEMBER?.update && (
        <ListContainer>
          <ListItemContainer>
            <ListButton disableTouchRipple onClick={handleClick(1)}>
              <ListItemText className="cursor-pointer" primary={menusObj.member.menu} />
              <Icon className="cursor-pointer" sx={{ mr: 1 }}>
                {open[1] ? <ExpandLess /> : <ExpandMore />}
              </Icon>
            </ListButton>
          </ListItemContainer>
          <Collapse in={open[1]} timeout="auto" mountOnEnter={menusObj.member.isLazyLoad}>
            <ListContentContainer maxWidth={false}>{menusObj.member.component}</ListContentContainer>
          </Collapse>
        </ListContainer>
      )}

      {data?.data?.rolePermissions?.PROJECT?.delete && !profileData?.data?.isDemo && (
        <ListContainer>
          <ListItemContainer>
            <ListButton disableTouchRipple onClick={handleClick(2)}>
              <ListItemText className="cursor-pointer" primary={menusObj.other.menu} />
              <Icon className="cursor-pointer" sx={{ mr: 1 }}>
                {open[2] ? <ExpandLess /> : <ExpandMore />}
              </Icon>
            </ListButton>
          </ListItemContainer>
          <Collapse in={open[2]} timeout="auto" mountOnEnter={menusObj.other.isLazyLoad}>
            <ListContentContainer maxWidth={false}>{menusObj.other.component}</ListContentContainer>
          </Collapse>
        </ListContainer>
      )}
    </>
  );
};

export default ProjectSettingPage;
