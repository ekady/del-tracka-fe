'use server';

import { revalidateTag } from 'next/cache';

import { ACTIVITIES_TASK_FETCH_TAG } from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_constants/activitiesTaskTag.constant';
import { IProjectSprintTaskId } from '@/app/app/projects/[id]/[sprint_id]/_interfaces';

export const revalidateTaskActivities = ({ projectId, sprintId, taskId }: IProjectSprintTaskId) => {
  revalidateTag(`${ACTIVITIES_TASK_FETCH_TAG}-${projectId}-${sprintId}-${taskId}`);
};
