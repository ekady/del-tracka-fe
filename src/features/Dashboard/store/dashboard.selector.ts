import { RootState } from '@/common/store';
import { dashboardApiSlice, DashboardResponse } from './dashboard.api.slice';

const initialData: DashboardResponse = {
  totalProjects: 0,
  totalTasks: 0,
  allTasks: [0.01, 0.01, 0.01],
  allAssignTo: [0.01, 0.01, 0.01],
  activities: [],
  activitiesLabel: [],
};

const selectDashboardData = (state: RootState) => dashboardApiSlice.endpoints.getDashboardDatas.select()(state).data;

export const selectTotalProjects = (state: RootState) =>
  selectDashboardData(state)?.totalProjects ?? initialData.totalProjects;
export const selectTotalTasks = (state: RootState) => selectDashboardData(state)?.totalTasks ?? initialData.totalTasks;
export const selectissueAll = (state: RootState) => selectDashboardData(state)?.allTasks ?? initialData.allTasks;
export const selectTaskAssignTo = (state: RootState) =>
  selectDashboardData(state)?.allAssignTo ?? initialData.allAssignTo;
export const selectActivities = (state: RootState) => selectDashboardData(state)?.activities ?? initialData.activities;
export const selectActivitiesLabel = (state: RootState) =>
  selectDashboardData(state)?.activitiesLabel ?? initialData.activitiesLabel;
