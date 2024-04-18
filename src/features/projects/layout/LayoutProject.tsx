import { ReactNode } from 'react';

import dynamic from 'next/dynamic';

import { ILayoutDefaultWithDrawerProps } from '@/common/layout/LayoutDrawerAdditional';

const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const LayoutDrawerAdditional = dynamic(() => import('@/common/layout/LayoutDrawerAdditional'), { ssr: false });
const ProjectSide = dynamic(() => import('../components/ProjectSide'), { ssr: false });

export interface ILayoutProjectProps extends Omit<ILayoutDefaultWithDrawerProps, 'menuList' | 'content'> {
  content: ReactNode;
}

const LayoutProject = ({ content, ...layoutProps }: ILayoutProjectProps) => {
  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <LayoutDrawerAdditional menuList={<ProjectSide />} content={content} {...layoutProps} />
    </Box>
  );
};

export default LayoutProject;
