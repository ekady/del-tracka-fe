import { Metadata } from 'next';

import { redirect } from 'next/navigation';

import { actionFetchProfile } from '@/app/_common/actions/profile.action.utils';
import TitleWithBreadcrumb from '@/app/_common/base/TitleWithBreadcrumb';
import { IProjectPageProps } from '@/app/app/projects/[id]/_interfaces';
import { actionFetchProjectMember } from '@/app/app/projects/[id]/member/_actions/projectMember.action.utils';
import MemberList from '@/app/app/projects/[id]/member/_components/MemberList';
import { actionFetchProject } from '@/app/app/projects/_actions/project.action.utils';

export async function generateMetadata(props: IProjectPageProps): Promise<Metadata> {
  const params = await props.params;
  const project = await actionFetchProject(params.id);
  return {
    title: `Member ${project?.name ?? 'Project'}`,
  };
}

const ProjectMemberPage = async (props: IProjectPageProps) => {
  const params = await props.params;
  const profile = await actionFetchProfile();
  const project = await actionFetchProject(params.id);
  const memberList = await actionFetchProjectMember(params.id);

  if (project?.rolePermissions?.PROJECT?.update) redirect(`/app/projects/${params.id}/settings`);

  return (
    <>
      <TitleWithBreadcrumb
        title={`Member ${project?.name ?? 'Project'}`}
        backTo={`/app/projects/${params.id}`}
        breadcrumbs={[
          { breadcrumb: 'Project', href: '/app/projects' },
          { breadcrumb: project?.name ?? params.id, href: `/app/projects/${params.id}` },
          { breadcrumb: 'Member', href: `/app/projects/${params.id}/member` },
        ]}
      />
      <MemberList memberList={memberList} profile={profile} project={project} projectId={params.id} />
    </>
  );
};

export default ProjectMemberPage;
