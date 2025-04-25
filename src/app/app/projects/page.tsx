import { Metadata } from 'next';

import TitleWithBreadcrumb from '@/app/_common/base/TitleWithBreadcrumb';

import { actionFetchProjectList } from './_actions/project.action.utils';
import ProjectList from './_components/ProjectList';

export const metadata: Metadata = {
  title: 'Project',
};

const ProjectBlankPage = async () => {
  const projects = await actionFetchProjectList();
  return (
    <>
      <TitleWithBreadcrumb title="Project" breadcrumbs={[{ breadcrumb: 'Project', href: '/app/projects' }]} />

      <ProjectList projects={projects} />
    </>
  );
};

export default ProjectBlankPage;
