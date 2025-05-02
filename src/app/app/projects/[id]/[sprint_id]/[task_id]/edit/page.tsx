import { Suspense } from 'react';

import { Metadata } from 'next';

import Link from 'next/link';

import { Box, Button, ButtonGroup } from '@mui/material';

import { levelList } from '@/app/_common/constants/level.constant';
import { statusList } from '@/app/_common/constants/status.constant';
import { actionFetchTask } from '@/app/app/projects/[id]/[sprint_id]/[task_id]/_actions/taskId.action.utils';
import { ILayoutTaskWithIdProps } from '@/app/app/projects/[id]/[sprint_id]/[task_id]/_interfaces';
import TaskActivityListSkeleton from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_component/TaskActivitySkeleton';
import TaskActivityWrapper from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_component/TaskActivityWrapper';
import TaskBreadcrumb from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_component/TaskBreadcumb';
import TaskCommentForm from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_component/TaskCommentForm';
import TaskCommentWrapper from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_component/TaskCommentWrapper';
import TaskEditForm from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_component/TaskEditForm';
import TaskIdInformation from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_component/TaskIdInformation';
import { actionFetchSprint } from '@/app/app/projects/[id]/_actions/projectId.action.utils';
import { actionFetchProjectMember } from '@/app/app/projects/[id]/member/_actions/projectMember.action.utils';
import { IProjectMember, ITaskForm, ITaskResponse } from '@/app/app/projects/_interfaces';

import TaskActivityFilter from './_component/TaskActivityFilter';

export const metadata: Metadata = {
  title: 'Edit Task',
};

const transformTaskResponseToForm = (task: ITaskResponse | null, memberList: IProjectMember[]): ITaskForm => ({
  _id: task?._id,
  shortId: task?.shortId,
  title: task?.title ?? '',
  feature: task?.feature ?? '',
  detail: task?.detail ?? '',
  assignee: memberList.find((member) => member._id === task?.assignee?._id) ?? null,
  reporter: memberList.find((member) => member._id === task?.reporter?._id) ?? null,
  dueDate: task?.dueDate ?? null,
  images: task?.images ?? [],
  priority: levelList.find((level) => level.value === task?.priority) ?? null,
  status: statusList.find((status) => status.value === task?.status) ?? null,
});

const EditTaskPage = async (props: ILayoutTaskWithIdProps) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const memberList = await actionFetchProjectMember(params.id);
  const sprint = await actionFetchSprint({ projectId: params.id, sprintId: params.sprint_id });
  const taskResponse = await actionFetchTask({
    projectId: params.id,
    sprintId: params.sprint_id,
    taskId: params.task_id,
  });

  const task: ITaskForm = transformTaskResponseToForm(taskResponse, memberList);

  const isForm = !searchParams?.section || searchParams?.section === 'form';
  const isComments = searchParams?.section === 'comments';
  const isActivities = searchParams?.section === 'activities';
  return (
    <>
      <TaskBreadcrumb sprint={sprint} task={taskResponse} />
      <Box display="flex" alignItems="center" justifyContent="center">
        <ButtonGroup disableElevation variant="outlined" aria-label="outlined primary button group">
          <Button variant={isForm ? 'contained' : 'outlined'} LinkComponent={Link} href="?section=form">
            Form
          </Button>
          <Button variant={isComments ? 'contained' : 'outlined'} LinkComponent={Link} href="?section=comments">
            Comments
          </Button>
          <Button variant={isActivities ? 'contained' : 'outlined'} LinkComponent={Link} href="?section=activities">
            Activities
          </Button>
        </ButtonGroup>
      </Box>

      <TaskIdInformation id={task.shortId} />

      {isForm && <TaskEditForm memberList={memberList} sprint={sprint} task={task} />}

      {isComments && (
        <>
          <TaskCommentForm ids={{ projectId: params.id, sprintId: params.sprint_id, taskId: params.task_id }} />
          <TaskCommentWrapper
            ids={{ projectId: params.id, sprintId: params.sprint_id, taskId: params.task_id }}
            searchParams={searchParams}
          />
        </>
      )}

      {isActivities && (
        <>
          <TaskActivityFilter />
          <Suspense
            key={JSON.stringify(searchParams ? { ...searchParams } : {})}
            fallback={<TaskActivityListSkeleton />}
          >
            <TaskActivityWrapper
              ids={{ projectId: params.id, sprintId: params.sprint_id, taskId: params.task_id }}
              searchParams={searchParams}
            />
          </Suspense>
        </>
      )}
    </>
  );
};

export default EditTaskPage;
