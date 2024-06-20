export interface ILayoutTaskProps {
  params: {
    id: string;
    sprint_id: string;
  };
  searchParams?: Record<string, string | number | null | never>;
}

export interface IProjectSprintTaskId {
  projectId: string;
  sprintId: string;
  taskId: string;
}
