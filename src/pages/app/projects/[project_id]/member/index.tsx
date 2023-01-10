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
import { useProjectBreadcrumb } from '@/features/projects/hooks/useProjectBreadcrumb';

const ProjectMemberPage = () => {
  const { data, projectId } = useProjectId();
  const router = useRouter();

  useProjectBreadcrumb({ '[project_id]': data?.data?.name || '' });

  useEffect(() => {
    if (data?.data.rolePermissions.PROJECT.update) router.push(`/app/projects/${projectId}/setting`);
  }, [data, projectId, router]);

  if (data?.data.rolePermissions && !data?.data.rolePermissions.PROJECT.update)
    return <ProjectMemberList hideSelectOption />;
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
