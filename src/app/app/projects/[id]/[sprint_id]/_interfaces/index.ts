import { IPageParams } from "@/app/_common/types";

import { IIdParams } from "../../_interfaces";

export interface ILayoutTaskProps {
  params: Promise<Omit<IIdParams, 'task_id'>>;
  searchParams?: Promise<IPageParams['searchParams']>;
}

export interface IProjectSprintTaskId {
  projectId: string;
  sprintId: string;
  taskId: string;
}
