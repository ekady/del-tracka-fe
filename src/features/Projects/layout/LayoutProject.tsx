import { ReactNode, useEffect } from 'react';

import { Box } from '@mui/material';

import { LayoutDrawerAdditional } from '@/common/layout';
import { ProjectSide } from '../components';

import { LayoutDefaultWithDrawerProps } from '@/common/layout/LayoutDrawerAdditional';
import { resetApiState, useGetProjectsQuery } from '../store/project.api.slice';

export type LayoutProjectProps = Omit<LayoutDefaultWithDrawerProps, 'menuList' | 'content'> & {
  content: ReactNode;
};

const LayoutProject = ({ content, ...layoutProps }: LayoutProjectProps) => {
  const { data } = useGetProjectsQuery();

  useEffect(() => {
    return () => {
      resetApiState();
    };
  }, []);

  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <LayoutDrawerAdditional menuList={<ProjectSide projectList={data ?? []} />} content={content} {...layoutProps} />
    </Box>
  );
};
export default LayoutProject;
