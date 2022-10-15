// React
import { ReactElement, useEffect } from 'react';

// Next
import { useRouter } from 'next/router';

// MUI
import { Box, CircularProgress } from '@mui/material';

// Components
import { LayoutDefault } from '@/common/layout';
import { ProjectMemberList } from '@/features/projects/components';
import LayoutProject from '@/features/projects/layout/LayoutProject';
import useProjectId from '@/features/projects/hooks/useProjectId';
import { ProjectRoles } from '@/features/projects/constant/role';

const ProjectMemberPage = () => {
  const { data, projectId } = useProjectId();
  const router = useRouter();

  useEffect(() => {
    if (data?.data.role === ProjectRoles.OWNER) router.push(`/app/projects/${projectId}/setting`);
  }, [data, projectId, router]);

  if (data?.data.role !== ProjectRoles.OWNER) return <ProjectMemberList hideSelectOption />;
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100%" marginTop={5}>
      <CircularProgress />
    </Box>
  );
};

ProjectMemberPage.getLayout = (page: ReactElement) => {
  return (
    <LayoutDefault>
      <LayoutProject hideMenu content={page} />
    </LayoutDefault>
  );
};

export default ProjectMemberPage;
