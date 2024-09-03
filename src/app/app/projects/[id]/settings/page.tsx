import { Metadata } from 'next';

import { redirect } from 'next/navigation';

import { actionFetchProfile } from '@/app/_common/actions/profile.action.utils';
import TitleWithBreadcrumb from '@/app/_common/base/TitleWithBreadcrumb';
import { IProjectPageProps } from '@/app/app/projects/[id]/_interfaces';
import { actionFetchProjectMember } from '@/app/app/projects/[id]/member/_actions/projectMember.action.utils';
import SettingView from '@/app/app/projects/[id]/settings/_components/SettingView';
import { actionFetchProject } from '@/app/app/projects/_actions/project.action.utils';

export const metadata: Metadata = {
  title: 'Setting',
};

const ProjectSettingPage = async ({ params }: IProjectPageProps) => {
  const profile = await actionFetchProfile();
  const project = await actionFetchProject(params.id);
  const memberList = await actionFetchProjectMember(params.id);

  if (!project?.rolePermissions?.PROJECT?.update) redirect(`/app/projects/${params.id}/member`);

  return (
    <>
      <TitleWithBreadcrumb
        title="Setting"
        backTo={`/app/projects/${params.id}`}
        breadcrumbs={[
          { breadcrumb: 'Project', href: '/app/projects' },
          { breadcrumb: project?.name ?? params.id, href: `/app/projects/${params.id}` },
          { breadcrumb: 'Setting', href: `/app/projects/${params.id}/settings` },
        ]}
      />
      <SettingView profile={profile} project={project} memberList={memberList} projectId={params.id} />
    </>
  );
};

export default ProjectSettingPage;
