import { IPaginationResponse } from '@/app/_common/types';
import { actionFetchCommentList } from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_actions/commentTask.action.utils';
import TaskCommentList from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_component/TaskCommentList';
import { IProjectSprintTaskId } from '@/app/app/projects/[id]/[sprint_id]/_interfaces';
import { ITaskComment } from '@/app/app/projects/_interfaces';

interface ITaskCommentWrapperProps {
  ids: IProjectSprintTaskId;
  searchParams?: Record<string, string | number | null | never>;
}

const TaskCommentWrapper = async ({ ids, searchParams }: ITaskCommentWrapperProps) => {
  const commentPagination: IPaginationResponse<ITaskComment> = await actionFetchCommentList(ids, searchParams);

  return <TaskCommentList commentPagination={commentPagination} />;
};

export default TaskCommentWrapper;
