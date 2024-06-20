export interface ILayoutTaskWithIdProps {
  params: {
    id: string;
    sprint_id: string;
    task_id: string;
  };
  searchParams?: Record<string, string | number | null | never>;
}
