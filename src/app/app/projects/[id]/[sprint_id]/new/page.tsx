import { Metadata } from 'next';

import { ILayoutTaskProps } from '@/app/app/projects/[id]/[sprint_id]/_interfaces';
import TaskForm from '@/app/app/projects/[id]/[sprint_id]/new/_components/TaskForm';
import { actionFetchSprint } from '@/app/app/projects/[id]/_actions/projectId.action.utils';
import { actionFetchProjectMember } from '@/app/app/projects/[id]/member/_actions/projectMember.action.utils';

export const metadata: Metadata = {
  title: 'Add New Task',
};

const NewTaskPage = async (props: ILayoutTaskProps) => {
  const params = await props.params;
  const memberList = await actionFetchProjectMember(params.id);
  const sprint = await actionFetchSprint({ projectId: params.id, sprintId: params.sprint_id });
  return <TaskForm memberList={memberList} sprint={sprint} />;
};

export default NewTaskPage;
