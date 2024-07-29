import { Suspense } from 'react';

import { Metadata } from 'next';

import Link from 'next/link';

import { Box, Button, ButtonGroup, Typography } from '@mui/material';

import CarouselImages from '@/app/_common/base/CarouselImages';
import TitleWithBreadcrumb from '@/app/_common/base/TitleWithBreadcrumb';
import { IFileStream } from '@/app/_common/types';
import { actionFetchTask } from '@/app/app/projects/[id]/[sprint_id]/[task_id]/_actions/taskId.action.utils';
import TaskDetail from '@/app/app/projects/[id]/[sprint_id]/[task_id]/_components/TaskDetail';
import { ILayoutTaskWithIdProps } from '@/app/app/projects/[id]/[sprint_id]/[task_id]/_interfaces';
import TaskActivityFilter from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_component/TaskActivityFilter';
import TaskActivityListSkeleton from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_component/TaskActivitySkeleton';
import TaskActivityWrapper from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_component/TaskActivityWrapper';
import TaskCommentForm from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_component/TaskCommentForm';
import TaskCommentWrapper from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_component/TaskCommentWrapper';
import TaskIdInformation from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_component/TaskIdInformation';
import { actionFetchSprint } from '@/app/app/projects/[id]/_actions/projectId.action.utils';

export const metadata: Metadata = {
  title: 'Detail Task',
};

const DetailTaskPage = async ({ params, searchParams }: ILayoutTaskWithIdProps) => {
  const sprint = await actionFetchSprint({ projectId: params.id, sprintId: params.sprint_id });
  const taskResponse = await actionFetchTask({
    projectId: params.id,
    sprintId: params.sprint_id,
    taskId: params.task_id,
  });

  const isDetail = !searchParams?.section || searchParams?.section === 'detail';
  const isMedia = searchParams?.section === 'media';
  const isComments = searchParams?.section === 'comments';
  const isActivities = searchParams?.section === 'activities';
  return (
    <>
      <TitleWithBreadcrumb
        title="Detail Task"
        backTo={`/app/projects/${sprint?.project?.shortId}/${sprint?.shortId}`}
        breadcrumbs={[
          { breadcrumb: 'Project', href: '/app/projects' },
          {
            breadcrumb: sprint?.project?.name ?? '',
            href: `/app/projects/${sprint?.project?.shortId}`,
          },
          {
            breadcrumb: sprint?.name ?? '',
            href: `/app/projects/${sprint?.project?.shortId}/${sprint?.shortId}`,
          },
          {
            breadcrumb: taskResponse?.title ?? '',
            href: `/app/projects/${sprint?.project?.shortId}/${sprint?.shortId}/${taskResponse?.shortId}`,
          },
        ]}
      />

      <Box display="flex" alignItems="center" justifyContent="center">
        <ButtonGroup disableElevation variant="outlined" aria-label="outlined primary button group">
          <Button variant={isDetail ? 'contained' : 'outlined'} LinkComponent={Link} href="?section=detail">
            Detail
          </Button>
          <Button variant={isMedia ? 'contained' : 'outlined'} LinkComponent={Link} href="?section=media">
            Media
          </Button>
          <Button variant={isComments ? 'contained' : 'outlined'} LinkComponent={Link} href="?section=comments">
            Comments
          </Button>
          <Button variant={isActivities ? 'contained' : 'outlined'} LinkComponent={Link} href="?section=activities">
            Activities
          </Button>
        </ButtonGroup>
      </Box>

      <TaskIdInformation id={taskResponse?.shortId ?? ''} />

      {isDetail && <TaskDetail task={taskResponse} />}

      {isMedia && (
        <Box position="relative" bgcolor="white">
          {!taskResponse?.images?.length && (
            <Typography textAlign="center" py={4} color="black">
              No Images
            </Typography>
          )}
          <CarouselImages
            images={
              (taskResponse?.images?.filter((img) => 'completedPath' in img && img.completedPath) as IFileStream[]) ??
              []
            }
          />
        </Box>
      )}

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

      <Box mt={5} display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
        <Button
          variant="outlined"
          LinkComponent={Link}
          href={`/app/projects/${sprint?.project?.shortId}/${sprint?.shortId}`}
        >
          Back
        </Button>
        <Button
          variant="contained"
          LinkComponent={Link}
          href={`/app/projects/${sprint?.project?.shortId}/${sprint?.shortId}/${taskResponse?.shortId}/edit`}
        >
          Edit
        </Button>
      </Box>
    </>
  );
};

export default DetailTaskPage;
