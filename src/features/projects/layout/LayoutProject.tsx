import { ReactNode } from 'react';

import { Box } from '@mui/material';

import { LayoutDrawerAdditional } from '@/common/layout';
import { ProjectSide } from '../components';

import { LayoutDefaultWithDrawerProps } from '@/common/layout/LayoutDrawerAdditional';

export type LayoutProjectProps = Omit<LayoutDefaultWithDrawerProps, 'menuList' | 'content'> & {
  content: ReactNode;
};

const LayoutProject = ({ content, ...layoutProps }: LayoutProjectProps) => {
  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <LayoutDrawerAdditional menuList={<ProjectSide />} content={content} {...layoutProps} />
    </Box>
  );
};

export default LayoutProject;
