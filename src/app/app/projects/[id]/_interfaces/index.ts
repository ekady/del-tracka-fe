export interface IIdParams {
  id: string;
  sprint_id: string;
  task_id: string;
}

export interface IProjectPageProps {
  params: Promise<Pick<IIdParams, 'id'>>;
}
